import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const BoxDiaryPasien = ({onCLick, dataUser, selected}) => {
  const data = selected
  //   const [title, setTitle] = useState(""); // State untuk title
  const [diary, setDiary] = useState(""); // State untuk diary
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null); // State untuk error handling
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const navigate = useNavigate();
  console.log(dataUser);

  // Mengisi state jika ada data untuk di-update
  useEffect(() => {
    if (data) {
      //   setTitle(data.title || ""); // Mengisi title jika ada
      setDiary(data?.attributes?.desc || ""); // Mengisi diary jika ada
    }
  }, [data]);

  const handlePost = async () => {
    setPosting(true);
    setError(null); // Reset error state

    try {
      const diaryData = {
        data: {
          desc: diary, // Mengambil value dari input diary
          physicotheraphy: dataUser,
          doctor: auth()?.id,
        },
      };

      // Jika data dan keyId ada, lakukan update (PUT), jika tidak, lakukan post (POST)
      if (data && data.id) {
        await axios.put(
          `https://admin.aikenhealth.id/api/consultings/${data.id}`,
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
          "https://admin.aikenhealth.id/api/consultings",
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
      setDiary(""); // Reset diary setelah berhasil posting
      navigate("/"); // Redirect setelah sukses
    } catch (error) {
      console.error("Error creating/updating diary:", error); // Log error jika gagal
      setError("Gagal mengirim diary. Coba lagi.");
      setPosting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={onCLick}
          className="text-gray-400 hover:text-gray-600"
        >
          <span className="text-xl">✖</span>
        </button>
        <button
          className={`${
            posting
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841]"
          } text-white font-semibold py-1 px-4 rounded-full transition-colors duration-300`}
          onClick={handlePost}
          disabled={posting}
        >
          {posting ? "Posting..." : data && data.id ? "Update" : "Posting"}
        </button>
      </div>

      {/* <input
        type="text"
        className="w-full mt-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Judul diary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}

      <textarea
        className="w-full mt-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows="3"
        placeholder="Saran Dokter..."
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
      ></textarea>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BoxDiaryPasien;
