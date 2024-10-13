import React, { useState } from "react";
import Input from "../molecules/Input";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentForm = ({ doctor, user }) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentEvidence, setPaymentEvidence] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate()
  const auth = useAuthUser();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload file ke Strapi /upload endpoint
      const formData = new FormData();
      formData.append("files", paymentEvidence); // Pastikan ini sesuai dengan file input

      const uploadResponse = await axios.post(
        "https://admin.aikenhealth.id/api/upload",
        formData,
        {
          headers: {
            Authorization: authHeader(), // Menambahkan JWT token di header
          },
        }
      );

      const fileId = uploadResponse.data[0].id;

      // Kirim data pembayaran setelah upload file berhasil
      const paymentData = {
        data: {
          BankName: bankName,
          AccountNumber: accountNumber,
          PaymentEvidence: fileId,
          users_permissions_user: auth()?.id, // User ID
          physicotheraphy: doctor?.id,
        },
      };

      const paymentResponse = await axios.post(
        "https://admin.aikenhealth.id/api/payments",
        paymentData,
        {
          headers: {
            Authorization: authHeader(), // Menambahkan JWT token di header
            "Content-Type": "application/json",
          },
        }
      );

      if (paymentResponse.status === 200) {
        navigate("/")
      } else {
        alert("Error submitting payment.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
     <form className="grid grid-cols-1 mt-4 gap-[14px]" onSubmit={handleSubmit}>
      {/* Rekening Tujuan */}
      <Input
        title={t('target_account')} // Terjemahan untuk Rekening Tujuan
        placeholder={t('target_account_placeholder')} // Placeholder terjemahan
        disabled
      />
      {/* Nama */}
      <Input
        title={t('name')} // Terjemahan untuk Nama
        placeholder={t('name_placeholder')} // Placeholder terjemahan
        value={user?.username}
        disabled
      />
      {/* Nomor Handphone */}
      <Input
        title={t('phone_number')} // Terjemahan untuk Nomor Handphone
        placeholder={t('phone_number_placeholder')} // Placeholder terjemahan
        value={user?.phone}
        disabled
      />
      {/* Nama Bank */}
      <Input
        title={t('bank_name')} // Terjemahan untuk Nama Bank
        placeholder={t('bank_name_placeholder')} // Placeholder terjemahan
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      {/* Nomor Rekening */}
      <Input
        title={t('account_number')} // Terjemahan untuk Nomor Rekening
        placeholder={t('account_number_placeholder')} // Placeholder terjemahan
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      {/* Nama Psikiater */}
      <Input
        title={t('psychiatrist_name')} // Terjemahan untuk Nama Psikiater
        placeholder={t('psychiatrist_name_placeholder')} // Placeholder terjemahan
        value={doctor?.attributes?.name}
        disabled
      />
      {/* Durasi */}
      <Input
        title={t('durationPayment')} // Terjemahan untuk Durasi
        placeholder={t('duration_placeholder')} // Placeholder terjemahan
        value={`${doctor?.attributes?.duration} ${t('duration_placeholder')}`}
        disabled
      />
      {/* Upload Bukti Pembayaran */}
      <Input
        title={t('upload_payment_proof')} // Terjemahan untuk Upload Bukti Pembayaran
        type="file"
        onChange={(e) => setPaymentEvidence(e.target.files[0])}
      />
      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300"
      >
        {t('submit_form')} {/* Terjemahan untuk tombol submit */}
      </button>
    </form>
  );
};

export default PaymentForm;
