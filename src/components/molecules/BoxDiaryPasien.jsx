import axios from "axios";
import React, { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import Comment from "../ReplyChat/Comment";
import { NavLink } from "react-router-dom";

const BoxDiaryPasien = ({
  active = true,
  pathname,
  title,
  diary,
  keyId,
  written,
  date,
}) => {
  const [show, setShow] = useState(false);
  const authHeader = useAuthHeader();
  const data = {
    title,
    diary,
    keyId,
    written,
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };
  const deleteDiary = async (id) => {
    const apiURL = `https://admin.aikenhealth.id/api/dear-diaries/${id}`;

    try {
      const response = await axios.delete(apiURL, {
        headers: {
          Authorization: authHeader(),
        },
      });
      console.log("Data deleted:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const maskName = (name) => {
    const nameParts = name.split(" ");

    // Fungsi untuk memproses setiap bagian dari nama
    const maskPart = (part) => {
      if (part.length <= 2) return part; // Jika nama sangat pendek, tidak perlu diubah
      const firstTwo = part.slice(0, 2); // Ambil 2 huruf pertama
      const lastChar = part.slice(-1); // Ambil 1 huruf terakhir
      const middleStars = "*".repeat(part.length - 3); // Gantikan huruf di tengah dengan bintang
      return `${firstTwo}${middleStars}${lastChar}`;
    };

    // Terapkan fungsi maskPart ke setiap bagian dari nama
    return nameParts.map(maskPart).join(" ");
  };
  return (
    <div
      key={keyId}
      className="bg-gradient-to-r from-[#240F41] to-[#7A54B7] p-[1px] rounded-[20px] w-full h-fit shadow-md shadow-[#7A54B7]"
    >
      <div
        className={`${
          active ? "bg-gradient-to-b from-[#321A5C] to-[#150629]" : "bg-white"
        } px-[20px] py-[15px] rounded-[20px]`}
      >
        {!show ? null : (
          <Comment
            id={keyId}
            onClick={() => setShow(false)}
            written={maskName(written)}
          />
        )}
        {pathname === "/public-diary" ? (
          <div className="flex flex-row gap-[6px] items-center ">
            <img
              src="/images/profile.jpg"
              className=" w-[29px] h-[29px] bg-cover rounded-full "
            />
            <div className="flex flex-col">
              <h1
                className={`font-semibold text-[10px] ${
                  active ? "text-white" : null
                }`}
              >
                {maskName(written)}
              </h1>
              <p className=" text-[#757575] text-[8px] font-semibold ">
                {formatDate(date)}
              </p>
            </div>
          </div>
        ) : null}
        <div className="flex flex-row justify-between items-center my-[12px]">
          <div className="">
            <h1
              className={`${
                active
                  ? "bg-gradient-to-r from-[#89C0FF]  to-[#DFCCFF]"
                  : "bg-gradient-to-r from-[#7A54B7]  to-[#240F41]"
              } inline-block text-transparent bg-clip-text font-bold text-[18px] `}
            >
              {title}
            </h1>
            {pathname === "/dear-diary" ? (
              <p className=" text-[#757575] text-[10px] font-semibold ">
                {formatDate(date)}
              </p>
            ) : null}
          </div>

          {pathname === "/public-diary" ? (
            <i
              onClick={() => setShow(true)}
              className="bx bxs-chat text-[20px] text-gray-400 "
            ></i>
          ) : (
            <div className="flex flex-row gap-[15px]">
              
            </div>
          )}
        </div>
        <h1
          className={`font-medium text-[11px] ${active ? "text-white" : null}`}
        >
          {diary}
        </h1>
      </div>
    </div>
  );
};

export default BoxDiaryPasien;
