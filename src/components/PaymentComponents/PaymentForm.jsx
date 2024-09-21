import React, { useState } from "react";
import Input from "../molecules/Input";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ doctor, user }) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentEvidence, setPaymentEvidence] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate()
  const auth = useAuthUser();

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
      <Input
        title="Rekening Tujuan"
        placeholder="9888876510 Mandiri a.n Aiken Project"
        disabled
      />
      <Input
        title="Name"
        placeholder="Masukkan nama lengkap anda"
        value={user?.username}
        disabled
      />
      <Input
        title="Nomor Handphone"
        placeholder="Nomor handphone anda"
        value={user?.phone}
        disabled
      />
      <Input
        title="Nama Bank"
        placeholder="Nama bank anda"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <Input
        title="Nomor Rekening"
        placeholder="Masukkan 4 digit akhir nomor rekening anda"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <Input
        title="Nama Psikiater"
        placeholder="Alex Andreas, S.Psi, M.Psi, Psikolog"
        value={doctor?.attributes?.name}
        disabled
      />
      <Input
        title="Durasi"
        placeholder="45 Menit"
        value={`${doctor?.attributes?.duration} Menit`}
        disabled
      />
      <Input
        title="Upload Bukti Pembayaran"
        type="file"
        onChange={(e) => setPaymentEvidence(e.target.files[0])}
      />
      <button
        type="submit"
        className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300"
      >
        Isi Formulir Pembayaran
      </button>
    </form>
  );
};

export default PaymentForm;
