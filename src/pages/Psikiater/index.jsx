import React, { useState, useEffect } from "react";
import Layout from "../../Layouts";
import PsikiaterCard from "../../components/molecules/PsikiaterCard";
import { NavLink } from "react-router-dom";
import { useFetchDataDoctor, useStoreDoctor } from "../../lib/store";
import { useTranslation } from "react-i18next";

const Psikiater = () => {
  const { dataDoctor } = useStoreDoctor();
  const { t } = useTranslation();
  useFetchDataDoctor(); // Call the custom hook to fetch data

  // State untuk hari yang dipilih
  const [selectedDay, setSelectedDay] = useState("All");
  const [availableDays, setAvailableDays] = useState([]);

  // Ambil daftar hari yang tersedia dari data dokter
  useEffect(() => {
    if (dataDoctor && dataDoctor.length > 0) {
      const daysSet = new Set();
      dataDoctor.forEach((doctor) => {
        doctor.attributes.days.data.forEach((day) =>
          daysSet.add(day.attributes.day)
        );
      });
      setAvailableDays(["All", ...Array.from(daysSet)]);
    }
  }, [dataDoctor]);

  // Filter dokter berdasarkan hari yang dipilih
  const filteredDoctors =
    selectedDay === "All"
      ? dataDoctor
      : dataDoctor.filter((doctor) =>
          doctor.attributes.days.data.some(
            (day) => day.attributes.day === selectedDay
          )
        );

  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pb-[200px]"
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <div className="flex flex-row justify-between items-center mb-[12px]">
          <div>
            <img
              alt="text-mood"
              src="/ornaments/textMoodIcon.png"
              className="mt-[35px]"
            />
            <h1 className="mt-[-22px] font-bold text-[18px]">
              {t("physcotheraphist")}
            </h1>
            <p className="font-medium text-[#949494] text-[13px]">
              {t("physcotheraphistDesc")}
            </p>
          </div>
          <NavLink to="/chat-doctor">
            <i className="bx bx-chat text-[20px] mt-[15px]"></i>
          </NavLink>
        </div>

        {/* Dropdown untuk memilih hari */}
        <div className="mb-[20px]">
          <label htmlFor="day-select" className="block font-medium">
            {t("chooseDay")}
          </label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-white px-4 py-2 mt-2"
          >
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day === "All"
                  ? t("all")
                  : t(`days_of_week.${day.toLowerCase()}`)}
              </option>
            ))}
          </select>
        </div>

        {/* List dokter */}
        <div className="flex flex-col gap-[20px]">
          {filteredDoctors && filteredDoctors.length > 0 ? (
            filteredDoctors.map((item) => (
              <NavLink
                key={item.id}
                to={`/psikiater-profile`}
                state={{ doctor: item }} // Mengirim data doctor melalui state
              >
                <PsikiaterCard
                  keyId={item.id}
                  name={item.attributes.name}
                  stars={item.attributes.star}
                  hour={item.attributes.hour}
                  degree={t("clinis")}
                  photo={
                    `https://admin.aikenhealth.id` +
                    item.attributes.photo.data.attributes.url
                  }
                />
              </NavLink>
            ))
          ) : (
            <p>{t("noEntries")}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Psikiater;
