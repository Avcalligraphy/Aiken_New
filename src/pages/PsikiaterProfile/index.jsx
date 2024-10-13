import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PsikiaterProfile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { doctor } = location.state || {}; // Ambil data doctor dari state
  const [translatedDoctor, setTranslatedDoctor] = useState(null); // State untuk menyimpan hasil terjemahan
  const language = localStorage.getItem("language") || "ar"; // Ambil bahasa dari localStorage, default ke 'ar'

  // Fungsi untuk mentranslate teks
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

  // Fungsi untuk menerjemahkan data doctor
  useEffect(() => {
    const translateDoctorData = async () => {
      if (doctor?.attributes) {
        // Terjemahkan nama, gelar, pengalaman, dan durasi
        const translatedName = await translateText(doctor.attributes.name);
        const translatedDegree = await translateText(doctor.attributes.degree);
        const translatedExperience = await translateText(
          `${doctor.attributes.experience} Tahun`
        );
        const translatedDuration = await translateText(
          `${doctor.attributes.duration} Menit`
        );

        // Terjemahkan bidang keahlian
        const translatedFields = await Promise.all(
          doctor.attributes.field.map(async (item) => {
            const translatedField = await translateText(item.field);
            return {
              ...item,
              field: translatedField, // Ganti dengan terjemahan
            };
          })
        );

        // Terjemahkan riwayat pendidikan
        const translatedEducation = await Promise.all(
          doctor.attributes.educational.map(async (item) => {
            const translatedDegree = await translateText(item.degree);
            const translatedInstitution = await translateText(item.institution);
            return {
              ...item,
              degree: translatedDegree,
              institution: translatedInstitution,
            };
          })
        );

        // Simpan data yang sudah diterjemahkan
        setTranslatedDoctor({
          ...doctor,
          attributes: {
            ...doctor.attributes,
            name: translatedName,
            degree: translatedDegree,
            experience: translatedExperience,
            duration: translatedDuration,
            field: translatedFields,
            educational: translatedEducation,
          },
        });
      }
    };

    translateDoctorData();
  }, [doctor, language]);

  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pt-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <img alt="text-mood" src="/ornaments/textMoodIcon.png" />
        <h1 className="mt-[-22px] font-bold text-[20px] ">
          {doctor?.attributes?.name || `${t('loading')}`}
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          {translatedDoctor?.attributes?.degree || `${t('loading')}`}
        </p>
        <div className="flex justify-center">
          <img
            src={
              `https://admin.aikenhealth.id` +
              doctor?.attributes?.photo?.data?.attributes?.url
            }
            alt="image-psikiater"
            className="w-[220px] bg-cover h-[180px] rounded-[20px] mt-[10px]  "
          />
        </div>
        <div className="flex flex-col mt-[20px]  ">
          <div className="max-w-sm mx-auto p-4 shadow-lg rounded-lg">
            <h1 className="font-bold text-lg text-[#443CC1] ">
              Rp {doctor?.attributes?.price}
            </h1>
            <div className="flex flex-row justify-between mt-[10px] ">
              <div>
                <h1 className="font-semibold text-lg">{t("experience")}</h1>
                <p className="font-semibold text-[#333333] ">
                  {translatedDoctor?.attributes?.experience || `${t('loading')}`}
                </p>
              </div>
              <div>
                <h1 className="font-semibold text-lg">{t("duration")} :</h1>
                <p className="font-semibold text-[#333333] ">
                  {translatedDoctor?.attributes?.duration || `${t('loading')}`}
                </p>
              </div>
            </div>
            <div className="mb-4 mt-4">
              <h2 className="text-lg font-semibold">{t("field")} :</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {translatedDoctor?.attributes?.field.map((item, index) => {
                  const bgColors = [
                    "bg-blue-200",
                    "bg-gray-200",
                    "bg-pink-200",
                    "bg-green-200",
                    "bg-teal-200",
                  ];
                  const textColors = [
                    "text-blue-800",
                    "text-gray-800",
                    "text-pink-800",
                    "text-green-800",
                    "text-teal-800",
                  ];

                  const bgColor = bgColors[index % bgColors.length];
                  const textColor = textColors[index % textColors.length];
                  return (
                    <span
                      className={`${bgColor} ${textColor} px-3 py-1 rounded-full`}
                      key={index}
                    >
                      {item.field || `${t('loading')}`}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">{t("history")} :</h2>
              {translatedDoctor?.attributes?.educational.map((item, index) => (
                <div key={index}>
                  <p>{item.degree || `${t('loading')}`}</p>
                  <p>
                    {item.institution}, {item.year}
                  </p>
                </div>
              ))}
            </div>

            <NavLink
              to="/payment-rules"
              state={{ doctor: translatedDoctor || doctor }}
            >
              <button className="w-full bg-[#240F41] text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-300">
                {t("make_appointment")}
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PsikiaterProfile;
