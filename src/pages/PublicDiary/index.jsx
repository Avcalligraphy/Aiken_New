import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import Button from "../../components/molecules/Button";
import BoxDiary from "../../components/molecules/BoxDiary";
import { useLocation } from "react-router-dom";
import { useFetchData, useStore } from "../../lib/store";
import { useTranslation } from "react-i18next";

const PublicDiary = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { data } = useStore();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language");
  useFetchData();

  const translateText = async (text) => {
    const response = await fetch(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          "x-rapidapi-key":
            "8275405090msh11c4edaf317ebc4p15fe72jsn2c42e223b715",
        },
        body: JSON.stringify({
          q: text,
          source: "id", // Bahasa Indonesia
          target: language, // Bahasa Arab
        }),
      }
    );
    const result = await response.json();
    return result?.data?.translations?.translatedText;
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      // Lakukan terjemahan untuk setiap title dan diary
      const translated = await Promise.all(
        data.map(async (item) => {
          const translatedTitle = await translateText(item.attributes.title);
          const translatedDiary = await translateText(item.attributes.diary);
          return {
            ...item,
            attributes: {
              ...item.attributes,
              title: translatedTitle,
              diary: translatedDiary,
            },
          };
        })
      );
      setTranslatedData(translated);
    };

    if (data.length > 0) {
      fetchTranslations();
    }
  }, [data]);

  return (
    <Layout title={t("publicDiary")}>
      <div
        className="min-h-screen px-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row justify-between items-center mb-[12px] ">
          <div>
            <img
              alt="text-mood"
              src="/ornaments/textMoodIcon.png"
              className="mt-[35px]"
            />
            <h1 className=" mt-[-22px] font-bold text-[18px] ">
              {t("titlePublic")}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          {translatedData && translatedData.length > 0 ? (
            translatedData.map((item, index) => (
              <BoxDiary
                keyId={item.id}
                title={item.attributes.title}
                diary={item.attributes.diary}
                date={item.attributes.publishedAt}
                written={
                  item.attributes.users_permissions_user.data.attributes
                    .username
                }
                pathname={pathname}
                // Selang-seling active berdasarkan index
                {...(index % 2 === 0 ? {} : { active: false })}
              />
            ))
          ) : (
            <p>{t('entri')}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PublicDiary;
