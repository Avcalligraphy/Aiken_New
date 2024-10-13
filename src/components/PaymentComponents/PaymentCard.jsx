import React from "react";
import { useTranslation } from "react-i18next";
import Input from "../molecules/Input";
import { NavLink } from "react-router-dom";

const PaymentCard = ({ doctor, price }) => {
  const { t } = useTranslation(); // Menggunakan hook untuk terjemahan

  return (
    <div className="flex mt-4 items-center justify-center">
      <div className="rounded-lg max-w-md w-full">
        {/* Instruksi pembayaran */}
        <p className="text-black mb-4">
          {t("payment_instruction")}{" "}
          {/* Terjemahan untuk instruksi pembayaran */}
        </p>

        {/* Step 1 */}
        <div className="mb-4">
          <Input
            title={t("select_account")} // Terjemahan untuk "Pilih Nomor Rekening Tujuan"
            placeholder={t("account_placeholder")} // Placeholder terjemahan
          />
        </div>

        {/* Payment Amount */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">{t("payment_amount")}</h2>{" "}
          {/* Terjemahan untuk nominal pembayaran */}
          <p className="text-[#443CC1] text-center text-3xl font-bold">
            Rp {price} {/* Nominal harga yang harus dibayarkan */}
          </p>
        </div>

        {/* Reminder */}
        <p className="text-gray-600 mb-6">
          {t("reminder")} {/* Terjemahan untuk pengingat */}
        </p>

        {/* Payment Form Button */}
        <NavLink to="/payment" state={{ doctor: doctor }}>
          <button className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300">
            {t("fill_payment_form")}{" "}
            {/* Terjemahan untuk tombol isi formulir pembayaran */}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PaymentCard;
