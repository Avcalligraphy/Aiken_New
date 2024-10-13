import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // Ubah bahasa di i18next
    localStorage.setItem("language", selectedLanguage); // Simpan bahasa ke localStorage
  };

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://admin.aikenhealth.id/api/users/me",
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when the component is mounted
  useEffect(() => {
    fetchUserData();
  }, []); // Run once on component mount

  // Update dateTime every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format options for displaying date and time
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = daysOfWeek[dateTime.getDay()];
  const date = dateTime.getDate();
  const month = monthsOfYear[dateTime.getMonth()];
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  // Calculate days since account creation
  const createdAt = new Date(userData?.createdAt);
  const diffTime = Math.abs(dateTime - createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  const trialDaysLeft = 3 - diffDays;

  // Block the user if trial period is over and not a premium user
  useEffect(() => {
    if (
      userData &&
      diffDays > 3 &&
      !userData.premiumAccount &&
      !userData.blocked
    ) {
      const handleBlocked = async () => {
        try {
          const response = await axios.put(
            `https://admin.aikenhealth.id/api/users/${userData.id}`,
            { blocked: true },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
              },
            }
          );
          if (response.status === 200) {
            signOut();
            navigate("/landing");
          }
        } catch (error) {
          console.error("Error blocking user:", error);
        }
      };
      handleBlocked();
    }
  }, [diffDays, userData, authHeader, signOut, navigate]);

  if (!userData) {
    return <div>{t("loading")}</div>;
  }
  

  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pb-[200px] flex flex-col"
        style={{ backgroundImage: "url(/ornaments/ornaments.png)" }}
      >
        <div className="flex justify-center mb-[10px]">
          <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[2px] rounded-full h-fit shadow-md shadow-[#7A54B7]">
            <div className="bg-white rounded-full p-[7px]">
              <img
                alt="profile"
                src={`/images/${
                  userData.gender === "male"
                    ? "profile.jpg"
                    : userData.gender === "female"
                    ? "profileFemale.png"
                    : "profileOther.png"
                }`}
                className="w-[126px] h-[126px] bg-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <p className="text-center font-semibold text-[14px] text-[#858585]">
          {userData.email}
        </p>
        <h1 className="text-center font-semibold text-[20px]">
          {userData.username}
        </h1>
        <div className="flex flex-col w-full mt-[46px]">
          <div className="flex justify-between items-center mb-[15px]">
            <div className="flex flex-row items-center gap-[16px]">
              <i className="bx bx-user-circle text-[24px] text-[#7A54B7]"></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px]">
                  {t("nameProfile")}
                </h1>
                <p className="font-medium text-[12px]">{userData.username}</p>
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7]"></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41] to-[#7A54B7] h-[2px]" />
        </div>
        <div className="flex flex-col w-full mt-[18px]">
          <div className="flex justify-between items-center mb-[15px]">
            <div className="flex flex-row items-center gap-[16px]">
              <i className="bx bxs-phone text-[24px] text-[#7A54B7]"></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px]">
                  {t("contactNumber")}
                </h1>
                <p className="font-medium text-[12px] ">+{userData.phone}</p>
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7]"></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41] to-[#7A54B7] h-[2px]" />
        </div>
        <div className="flex flex-col w-full mt-[18px]">
          <div className="flex justify-between items-center mb-[15px]">
            <div className="flex flex-row items-center gap-[16px]">
              <i className="bx bxs-user-check text-[24px] text-[#7A54B7]"></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px]">
                  {userData.premiumAccount === true
                    ? `${t("premium")}`
                    : `${t("trial")}`}
                </h1>
                <p className="font-medium text-[12px]">
                  {day}, {date} {month} {year} - {hours}:{minutes}:{seconds}
                </p>
                {!userData.premiumAccount && trialDaysLeft > 0 && (
                  <p className="text-red-500 text-[12px]">
                    Your trial expires in {trialDaysLeft} day(s).
                  </p>
                )}
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7]"></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41] to-[#7A54B7] h-[2px]" />
        </div>
        <div className="flex flex-col w-full mt-[18px]">
          <div className="flex justify-between items-center mb-[15px]">
            <div className="flex flex-row items-center gap-[16px]">
              <i className="bx bxs-user-voice text-[24px] text-[#7A54B7]"></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px]">
                  {t("language")}
                </h1>
                <select
                  className="font-medium text-[12px] "
                  onChange={changeLanguage}
                  value={i18n.language}
                >
                  <option className="font-medium text-[12px] " value="en">
                    English
                  </option>
                  <option className="font-medium text-[12px] " value="id">
                    Bahasa Indonesia
                  </option>
                  <option className="font-medium text-[12px] " value="ar">
                    العربية
                  </option>
                </select>
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7]"></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41] to-[#7A54B7] h-[2px]" />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
