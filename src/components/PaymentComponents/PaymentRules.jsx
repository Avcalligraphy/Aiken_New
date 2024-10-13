import React from "react";
import { useTranslation } from "react-i18next";
import Input from "../molecules/Input";
import { NavLink } from "react-router-dom";

const PaymentRules = ({ doctor }) => {
  const { t } = useTranslation(); // Gunakan hook useTranslation untuk akses terjemahan

  return (
    <div className="mt-[20px] flex items-center justify-center">
      <div className="rounded-lg max-w-md w-full">
        {/* Judul dari file JSON */}
        <h1 className="text-red-500 font-bold mb-4">{t("title")}</h1>

        {/* Step 1 */}
        <div className="mb-4">
          <Input
            title={t("step1_title")} // Terjemahan untuk title langkah 1
            placeholder={t("step1_placeholder")} // Terjemahan untuk placeholder input
          />
          <p className="text-gray-600 mt-2">
            {t("step1_description")}{" "}
            {/* Terjemahan untuk deskripsi langkah 1 */}
          </p>
        </div>

        {/* Step 2 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">{t("step2_title")}</h2>
          <p className="text-gray-600">
            {t("step2_description")}{" "}
            {/* Terjemahan untuk deskripsi langkah 2 */}
          </p>
        </div>

        {/* Step 3 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">{t("step3_title")}</h2>
          <p className="text-gray-600">
            {t("step3_description")}{" "}
            {/* Terjemahan untuk deskripsi langkah 3 */}
          </p>
        </div>

        {/* Step 4 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">{t("step4_title")}</h2>
          <p className="text-gray-600">
            {t("step4_description")}{" "}
            {/* Terjemahan untuk deskripsi langkah 4 */}
          </p>
        </div>

        {/* Tombol Pembayaran */}
        <NavLink to="/payment-card" state={{ doctor: doctor }}>
          <button className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300 shadow-md shadow-[#7A54B7]">
            {t("button_payment")} {/* Terjemahan untuk tombol pembayaran */}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PaymentRules;
