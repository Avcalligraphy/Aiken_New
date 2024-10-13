import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import Button from "../../components/molecules/Button";
import BoxDiary from "../../components/molecules/BoxDiary";
import { NavLink, useLocation } from "react-router-dom";
import { useFetchData, useStore } from "../../lib/store";
import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";

const DearDiary = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const auth = useAuthUser();
  const { data } = useStore();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language")

  useFetchData(); // Call the custom hook to fetch data

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
      const filteredData = data.filter(
        (item) =>
          item.attributes.users_permissions_user.data.attributes.username ===
          auth()?.username
      );

      // Lakukan terjemahan untuk setiap title dan diary
      const translated = await Promise.all(
        filteredData.map(async (item) => {
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
  }, [data, auth]);

  return (
    <Layout title={t("diary")}>
      <div
        className="min-h-screen px-[15px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
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
              {t("titleDiary")}
            </h1>
          </div>
          <NavLink to="/add-diary">
            <button
              className={`py-[6px] w-[98px] rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[12px] mt-[12px] `}
            >
              {t("buttonNote")}
            </button>
          </NavLink>
        </div>
        <div className="flex flex-col gap-[20px]">
          {translatedData && translatedData.length > 0 ? (
            translatedData.map((item, index) => (
              <BoxDiary
                keyId={item.id}
                title={item.attributes.title} // Terjemahan title
                diary={item.attributes.diary} // Terjemahan diary
                date={item.attributes.publishedAt}
                written={
                  item.attributes.users_permissions_user.data.attributes
                    .username
                }
                pathname={pathname}
                {...(index % 2 === 0 ? {} : { active: false })}
              />
            ))
          ) : (
            <p>{t("entri")}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DearDiary;
