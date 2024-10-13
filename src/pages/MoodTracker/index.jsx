import React, { useEffect, useState } from "react";
import BoxTracker from "../../components/MoodTrackerComponent/BoxTracker";
import Layout from "../../Layouts";
import BoxActivitie from "../../components/MoodTrackerComponent/BoxActivitie";
import ScatterChart from "../../components/Chart";
import {
  useFetchDataActivityMoods,
  useFetchDataMood,
  useStoreActivityMoods,
  useStoreMood,
} from "../../lib/store";
import { useAuthUser } from "react-auth-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
SwiperCore.use([Navigation, Pagination]);

const MoodTracker = () => {
  const { t } = useTranslation();
  const { dataMood } = useStoreMood();
  const { dataActivityMoods } = useStoreActivityMoods();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language") || "ar"; // Default ke bahasa Arab jika tidak ada
  useFetchDataActivityMoods();
  const auth = useAuthUser();
  useFetchDataMood();
  const filteredData = dataMood.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username ===
      auth()?.username
  );

  const today = new Date();

  // Filter moods where publishedAt is today's date
  const filteredDataMood = dataMood?.filter((item) => {
    const publishedDate = new Date(item.attributes.publishedAt);

    // Compare only the date part (ignoring time) for both today and publishedDate
    return (
      item.attributes.users_permissions_user.data.attributes.username ===
        auth()?.username &&
      publishedDate.toLocaleDateString() === today.toLocaleDateString()
    );
  });

  // Mengambil semua activity mood yang sesuai dengan mood hari ini
  const allMood =
    dataActivityMoods &&
    dataActivityMoods
      .filter(
        (item) =>
          filteredDataMood.length > 0 &&
          item.attributes.mood === filteredDataMood[0]?.attributes?.title
      )
      .map((item) => ({
        title: item.attributes.title,
        image: item.attributes.image.data.attributes.url,
      }));

  // Fungsi untuk menerjemahkan teks
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
          source: "en", // Asumsikan teks asli dalam bahasa Indonesia
          target: language, // Terjemahkan ke bahasa dari localStorage
        }),
      }
    );
    const result = await response.json();
    return result?.data?.translations?.translatedText;
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      const translated = await Promise.all(
        allMood.map(async (item) => {
          const translatedTitle = await translateText(item.title);
          return {
            ...item,
            title: translatedTitle, // Simpan hasil terjemahan langsung di title
          };
        })
      );
      setTranslatedData(translated);
    };

    if (dataActivityMoods.length > 0 && allMood.length > 0) {
      fetchTranslations();
    }
  }, [dataActivityMoods, allMood]); // Tambahkan allMood sebagai dependensi

  return (
    <Layout>
      <div
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
        className="min-h-screen px-[15px] pb-[200px]  "
      >
        <div className="mb-[30px]">
          <h1 className="font-semibold text-[18px]">{t("moodLabel")}</h1>
          <ScatterChart filteredData={filteredData} />
        </div>
        <img alt="text-mood" src="/ornaments/textMoodIcon.png" className="" />
        <h1 className="mt-[-22px] font-bold text-[18px]">
          {t("labelMoodRecorder")}{" "}
          <span className="text-purple-600">
            {filteredDataMood && filteredDataMood.length > 0
              ? filteredDataMood[0].attributes.title
              : `${t("entri")}`}
          </span>
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          {t("desclabelMoodRecorder")}{" "}
        </p>
        <div className="flex mt-8 ">
          <Swiper spaceBetween={100} slidesPerView={2} pagination={false}>
            {translatedData && translatedData.length > 0 ? (
              translatedData.map((item, index) => (
                <SwiperSlide key={index}>
                  <BoxActivitie
                    title={item.title} // Menampilkan title yang sudah diterjemahkan
                    image={`https://admin.aikenhealth.id${item.image}`}
                  />
                </SwiperSlide>
              ))
            ) : (
              <p className="text-black font-semibold">{t("entri")}</p>
            )}
          </Swiper>
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;
