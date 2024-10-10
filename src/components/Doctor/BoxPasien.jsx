import React from "react";
import { NavLink } from "react-router-dom";

const BoxPasien = ({ name,  gender, keyId, email, idPasien }) => {
  return (
    <div
      key={keyId}
      className="max-w-sm rounded-[13px] shadow-md p-4 border border-purple-200 relative"
    >
      {/* Foto kosong */}
      <div className="flex">
        <img
          className="w-[50px] h-[50px]  rounded-full flex items-center justify-center"
          src={`/images/${
            gender === "male"
              ? "profile.jpg"
              : gender === "female"
              ? "profileFemale.png"
              : "profileOther.png"
          }`}
        />

        {/* Nama, profesi, dan rating */}
        <div className="ml-4">
          <h3 className="text-[16px] font-semibold text-[#240F41] max-w-[200px] ">
            {name}
          </h3>
          <p className="text-[#7D8797] text-[12px] ">{gender}</p>
          <div className="flex items-center mt-[6px]">
            <span className="text-black font-bold text-[12px]  ">{email}</span>
            {/* <span className="text-gray-400 text-[12px] ml-2">(56 reviews)</span> */}
          </div>
        </div>
      </div>

      {/* Icon hati */}
      <div className="absolute top-4 right-4">
        <div className="flex flex-row gap-[10px] ">
          <NavLink to="/pasien-diary" state={{ dataUser: name }}>
            <i className="bx bx-notepad text-red-500 "></i>
          </NavLink>

          <NavLink to="/mood-pasien" state={{ dataUser: name }}>
            <i className="bx bxs-bar-chart-alt-2 text-purple-700 "></i>
          </NavLink>
          <NavLink to="/consultant" state={{ dataUser: idPasien, namePasien:name }}>
            <i className="bx bx-chat text-[20px] "></i>
          </NavLink>
        </div>
      </div>

      {/* Prosentase kecocokan */}
      {/* <div className="mt-[7px]">
        <p className="text-[12px]">The therapist fits:</p>
        <div className='flex flex-row gap-[11px] '> 
          <div className="w-full bg-gray-200 rounded-full h-[2px] mt-[7px]">
            <div
              className="bg-black h-[2px] rounded-full"
              style={{ width: "78%" }}
            ></div>
          </div>
          <span className="font-semibold text-[12px]">98%</span>
        </div>
      </div> */}
    </div>
  );
};

export default BoxPasien;
