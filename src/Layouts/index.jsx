import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import axios from "axios";
import NavbarDoctor from "./NavbarDoctor";
import { useTranslation } from "react-i18next";

const Layout = ({ children, title }) => {
  const authHeader = useAuthHeader();
  const [userData, setUserData] = useState(null); // User data state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const { t } = useTranslation();

  // Fungsi untuk mendapatkan bulan saat ini
  const getCurrentMonth = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tambahkan 0 di depan jika bulan < 10
    const year = today.getFullYear();
    return `${year}-${month}`;
  };

  // State untuk menyimpan nilai bulan
  const [month, setMonth] = useState(() => {
    // Ambil nilai dari localStorage jika ada, jika tidak gunakan bulan saat ini
    return localStorage.getItem("selectedMonth") || getCurrentMonth();
  });

  // Menyimpan bulan yang dipilih ke localStorage setiap kali state berubah
  useEffect(() => {
    localStorage.setItem("selectedMonth", month);
  }, [month]);

  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    navigate(-1); // -1 berarti kembali ke halaman sebelumnya
  };

  // Fungsi untuk mengubah bulan yang dipilih
  const handleMonthChange = (event) => {
    setMonth(event.target.value); // Update state saat user memilih bulan baru
  };

  // Fungsi untuk mendapatkan data user
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
  }, []); // Run once on component mount

  return (
    <div className="flex flex-col">
      <div className="bg-[#240F41] rounded-b-[30px] flex flex-row py-[23px] px-[20px] ">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-[5px] items-center justify-center">
            <i onClick={goBack} className="bx bx-chevron-left text-white"></i>
            {pathname === "/public-diary" ? (
              <NavLink to="/dear-diary">
                <h1 className="text-white font-bold text-[16px]">{title}</h1>
              </NavLink>
            ) : pathname === "/dear-diary" ? (
              <NavLink to="/public-diary">
                <h1 className="text-white font-bold text-[16px]">{title}</h1>
              </NavLink>
            ) : (
              <input
                type="month"
                className="text-white font-bold bg-transparent text-[16px]"
                value={month} // Atur nilai default input month
                onChange={handleMonthChange} // Fungsi untuk update bulan
              />
            )}
          </div>
          <NavLink to="/profile">
            {/* Tampilkan loading jika data sedang diambil */}
            {isLoading ? (
              <h1 className="text-white font-bold text-[16px]">
                {t("loading")}
              </h1>
            ) : (
              <h1 className="text-white font-bold text-[16px]">
                {userData?.premiumAccount ? `${t("premium")}` : `${t("trial")}`}
              </h1>
            )}
          </NavLink>
        </div>
      </div>
      <div className="pt-[20px]">{children}</div>
      {auth()?.status === "doctor" ? <NavbarDoctor /> : <Navbar />}
    </div>
  );
};

export default Layout;
