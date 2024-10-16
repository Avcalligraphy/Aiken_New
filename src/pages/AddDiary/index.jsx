import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddDiary = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Mendapatkan data dari lokasi (state) jika ada
  const [title, setTitle] = useState(""); // State untuk title
  const [diary, setDiary] = useState(""); // State untuk diary
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null); // State untuk error handling
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Mengisi state jika ada data untuk di-update
  useEffect(() => {
    if (data) {
      setTitle(data.title || ""); // Mengisi title jika ada
      setDiary(data.diary || ""); // Mengisi diary jika ada
    }
  }, [data]);

  const handlePost = async () => {
    setPosting(true);
    setError(null); // Reset error state

    try {
      const diaryData = {
        data: {
          title: title, // Mengambil value dari input title
          diary: diary, // Mengambil value dari input diary
          users_permissions_user: auth()?.id,
        },
      };

      // Jika data dan keyId ada, lakukan update (PUT), jika tidak, lakukan post (POST)
      if (data && data.keyId) {
        await axios.put(
          `https://admin.aikenhealth.id/api/dear-diaries/${data.keyId}`,
          diaryData,
          {
            headers: {
              Authorization: authHeader(), // Menambahkan JWT token di header
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Melakukan POST request jika tidak ada data (pembuatan baru)
        await axios.post(
          "https://admin.aikenhealth.id/api/dear-diaries",
          diaryData,
          {
            headers: {
              Authorization: authHeader(), // Menambahkan JWT token di header
              "Content-Type": "application/json",
            },
          }
        );
      }

      setPosting(false);
      setTitle(""); // Reset title setelah berhasil posting
      setDiary(""); // Reset diary setelah berhasil posting
      navigate("/dear-diary"); // Redirect setelah sukses
    } catch (error) {
      console.error("Error creating/updating diary:", error); // Log error jika gagal
      setError("Gagal mengirim diary. Coba lagi.");
      setPosting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4">
      <div className="flex justify-between items-center">
        <NavLink to="/dear-diary">
          <button className="text-gray-400 hover:text-gray-600">
            <span className="text-xl">✖</span>
          </button>
        </NavLink>
        <button
          className={`${
            posting
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841]"
          } text-white font-semibold py-1 px-4 rounded-full transition-colors duration-300`}
          onClick={handlePost}
          disabled={posting}
        >
          {posting
            ? `${t("posting")}...`
            : data && data.keyId
            ? `${t("update")}`
            : `${t("posting")}`}
        </button>
      </div>

      <input
        type="text"
        className="w-full mt-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder={t("diaryNote")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mt-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows="3"
        placeholder={t("descNote")}
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
      ></textarea>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddDiary;
