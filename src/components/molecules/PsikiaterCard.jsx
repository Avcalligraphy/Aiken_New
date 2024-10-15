import React from 'react'
import { useTranslation } from 'react-i18next';

const PsikiaterCard = ({name, degree, stars, keyId, photo, hour}) => {
  const {t} = useTranslation()
  return (
    <div
      key={keyId}
      className="max-w-sm rounded-[13px] shadow-md p-4 border border-purple-200 relative"
    >
      {/* Foto kosong */}
      <div className="flex">
        <img
          className="w-[50px] h-[50px]  rounded-full flex items-center justify-center"
          src={photo}
        />

        {/* Nama, profesi, dan rating */}
        <div className="ml-4">
          <h3 className="text-[16px] font-semibold text-[#240F41] max-w-[200px] ">
            {name}
          </h3>
          <p className="text-[#7D8797] text-[12px] ">{degree}</p>
          <div className="flex items-center mt-[6px]">
            <span className="text-yellow-500 font-bold text-[12px]  ">
              ★ {stars}
            </span>
            {/* <span className="text-gray-400 text-[12px] ml-2">(56 reviews)</span> */}
          </div>
        </div>
      </div>

      {/* Icon hati */}
      {/* <button className="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.364l1.318-1.046a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
      </button> */}

      {/* Prosentase kecocokan */}
      <div className="mt-[7px]">
        <p className="text-[12px]">{t("appointment")}:</p>
        <div className="flex flex-row gap-[11px] ">
          {/* <div className="w-full bg-gray-200 rounded-full h-[2px] mt-[7px]">
            <div
              className="bg-black h-[2px] rounded-full"
              style={{ width: "78%" }}
            ></div>
          </div> */}
          <span className="font-semibold text-[12px]">{hour}</span>
        </div>
      </div>
    </div>
  );
}

export default PsikiaterCard