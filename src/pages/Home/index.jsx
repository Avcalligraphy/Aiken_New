import React, { useEffect, useState } from 'react'
import Layout from '../../Layouts'
import BoxFeature from '../../components/HomeComponent/boxFeature';
import BoxEmotion from '../../components/HomeComponent/BoxEmotion';
import BoxReading from '../../components/HomeComponent/BoxReading';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { NavLink } from 'react-router-dom';
import { useFetchDataMood, useFetchDataReading, useStoreMood, useStoreReading } from '../../lib/store';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import BoxPasien from '../../components/Doctor/BoxPasien';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
SwiperCore.use([Navigation, Pagination]);

const Home = () => {
  const [userData, setUserData] = useState(null); // User data state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const language = localStorage.getItem("language") || "en"
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth")
  );
   const { t } = useTranslation();
  const { dataReading } = useStoreReading();
  useFetchDataReading();
  const { dataMood } = useStoreMood();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  useFetchDataMood();
  const filteredData = dataMood.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username ===
      auth()?.username
  );
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
          source: "id", // Asumsikan teks asli dalam bahasa Indonesia
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
         dataReading.map(async (item) => {
           const translatedTitle = await translateText(item.attributes.title);
           return {
             ...item,
             attributes: {
               ...item.attributes,
               title: translatedTitle, // Menyimpan terjemahan di sini
             },
           };
         })
       );
       setTranslatedTitle(translated);
    };

    fetchTranslations();
  }, [dataReading, language]);
  useEffect(() => {
    // Fungsi untuk memperbarui bulan jika ada perubahan di localStorage
    const checkMonthChange = () => {
      const currentMonth = localStorage.getItem("selectedMonth");
      if (currentMonth !== selectedMonth) {
        setSelectedMonth(currentMonth); // Update state jika bulan berubah
      }
    };

    // Set interval untuk memantau perubahan bulan setiap detik
    const interval = setInterval(checkMonthChange, 1000); // Cek setiap 1 detik

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [selectedMonth]);

  const monthFilteredData = filteredData.filter((item) => {
    const itemMonth = new Date(item.attributes.publishedAt)
      .toISOString()
      .slice(0, 7); // Ambil tahun-bulan
    return itemMonth === selectedMonth; // Cocokkan dengan bulan yang dipilih
  });
  // Fungsi untuk mendapatkan data user
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://admin.aikenhealth.id/api/users",
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      setUserData(response.data); // Set user data state
      setIsLoading(false); // Matikan loading state setelah data didapat
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false); // Matikan loading state jika ada error
    }
  };

  // Ambil data user saat komponen pertama kali di-mount
  useEffect(() => {
    fetchUserData();
  }, []);
  const filteredUsers = userData?.filter((user) => user.status === "user");

  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div
          className="w-full h-[165px] rounded-[20px] "
          style={{
            backgroundImage: "url(/images/imageHome.png)",
            backgroundSize: "cover",
          }}
        >
          <div
            className="h-[165px] rounded-[20px] p-[30px] "
            style={{
              backgroundImage: "url(/images/shadowHome.png)",
              backgroundSize: "cover",
            }}
          >
            <img
              className="pt-[30px]"
              src="/ornaments/textIcon.png"
              alt="textIcon"
            />
            <h1 className="text-white font-bold text-[48px] mt-[-56px]  ">
              Aiken
            </h1>
            <p className="text-white text-[14px] font-semibold mt-[10px] ">
              Media terapi interaktif untuk meningkatkan kesehatan mental remaja
            </p>
          </div>
        </div>
        {auth()?.status === "doctor" ? (
          <div className="mt-[10px]">
            <div className="flex flex-row justify-between items-center mb-[20px] ">
              <div>
                <img
                  alt="text-mood"
                  src="/ornaments/textMoodIcon.png"
                  className="mt-[35px]"
                />
                <h1 className=" mt-[-22px] font-bold text-[18px] ">Pasien</h1>
              </div>
            </div>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <BoxPasien
                  key={index}
                  idPasien={item.id}
                  gender={item.gender}
                  name={item.username}
                  email={item.email}
                />
              ))
            ) : (
              <p>{t("entri")}</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 mt-[20px] ">
              <NavLink to="/mood-assesment">
                <BoxFeature
                  title={t("moodAsses")}
                  icon="moodFeature"
                  color="bg-[#88D24E]"
                />
              </NavLink>
              <NavLink to="/dear-diary">
                <BoxFeature
                  title={t("dearDiary")}
                  icon="iconDiary"
                  color="bg-[#9D4760]"
                />
              </NavLink>
              <NavLink to="/psikiater">
                <BoxFeature
                  title={t("counseling")}
                  icon="iconDoctor"
                  color="bg-[#443CC1]"
                />
              </NavLink>
              <NavLink to="/chat-ai">
                <BoxFeature
                  title={t("aiChat")}
                  icon="iconAI"
                  color="bg-[#7A54B7]"
                />
              </NavLink>
            </div>
            <div className="flex flex-col w-full gap-[20px] mt-[20px] ">
              {monthFilteredData && monthFilteredData.length > 0 ? (
                monthFilteredData.map((item, index) => (
                  <div key={item.id}>
                    <BoxEmotion
                      id={item.id}
                      data={item}
                      date={item.attributes.publishedAt}
                      title={item.attributes.title}
                      dataMood={item.attributes.branchFeeling}
                    />
                  </div>
                ))
              ) : (
                <p>{t("moodAsses")}</p>
              )}
            </div>
            <div className="flex flex-col gap-[15px] mt-[15px] mb-[200px] ">
              <h1 className="text-black   font-bold text-[20px]  ">
                {t("readingCorner")}
              </h1>
              <div className="flex">
                <Swiper spaceBetween={180} slidesPerView={3} pagination={false}>
                  {translatedTitle && translatedTitle.length > 0 ? (
                    translatedTitle.map((item, index) => (
                      <SwiperSlide>
                        <NavLink
                          key={item.id}
                          to={`/reading-corner`}
                          state={{ reading: item }}
                        >
                          <BoxReading
                            keyId={item.id}
                            title={item.attributes.title}
                            photo={
                              `https://admin.aikenhealth.id` +
                              item.attributes.photo.data.attributes.url
                            }
                          />
                        </NavLink>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p> {t('entri')} </p>
                  )}
                </Swiper>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Home