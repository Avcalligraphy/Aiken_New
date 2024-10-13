import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import BoxDiary from "../../components/molecules/BoxDiary";
import {
  useFetchDataConsultant,
  useFetchDataDoctor,
  useStoreConsultant,
  useStoreDoctor,
} from "../../lib/store";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import BoxHistory from "../../components/molecules/BoxHistory";
import { useTranslation } from "react-i18next";

const ChatDoctor = ({ active }) => {
  const authUser = useAuthUser();
  const { dataDoctor } = useStoreDoctor();
  const { data } = useStoreConsultant();
  const { t } = useTranslation();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language");

  useFetchDataDoctor();
  useFetchDataConsultant();

  const filteredData = data.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username ===
      authUser()?.username
  );

  // Fungsi untuk menggabungkan data
  const mergeData = (filteredData, dataDoctor) => {
    return filteredData.map((item) => {
      const physiotherapyName =
        item.attributes.physicotheraphy.data.attributes.name;
      const doctor = dataDoctor.find(
        (doctor) => doctor.attributes.name === physiotherapyName
      );

      // Mengembalikan objek baru dengan informasi yang digabungkan
      return {
        ...item,
        doctorInfo: doctor ? doctor.attributes : null, // Menyimpan informasi dokter
      };
    });
  };

  const mergedData = mergeData(filteredData, dataDoctor);
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
        mergedData.map(async (item) => {
          const translatedTitle = await translateText(item.attributes.desc);
          return {
            ...item,
            attributes: {
              ...item.attributes,
              desc: translatedTitle,
            },
          };
        })
      );
      setTranslatedData(translated);
    };

    if (data.length > 0) {
      fetchTranslations();
    }
  }, [mergedData, dataDoctor, data]);

  return (
    <Layout title="M. Avav Sabilal Mujtaba">
      <div
        className=" px-[15px] pb-[150px]  "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <div className="flex flex-col gap-[20px]">
          {translatedData && translatedData.length > 0 ? (
            translatedData.map((item, index) => (
              <BoxHistory
                key={item.id} // Menambahkan key untuk setiap elemen
                id={item.id}
                desc={item.attributes.desc}
                date={item.attributes.publishedAt}
                name={item.attributes.physicotheraphy.data.attributes.name}
                doctorPhoto={
                  item.doctorInfo && item.doctorInfo.photo
                    ? item.doctorInfo.photo.data.attributes.url
                    : null
                }
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

export default ChatDoctor;
