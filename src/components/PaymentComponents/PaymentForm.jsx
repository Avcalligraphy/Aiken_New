import React from 'react'
import Input from '../molecules/Input'

const PaymentForm = () => {
  return (
    <div className="grid grid-cols-1 mt-4 gap-[14px]">
      <Input
        title="Rekening Tujuan"
        placeholder="9888876510 Mandiri a.n Aiken Project"
      />
      <Input title="Name" placeholder="Masukkan nama lengkap anda" />
      <Input title="Nomor Handphone" placeholder="Nomor handphone anda" />
      <Input title="Nama Bank" placeholder="Nama bank anda" />
      <Input
        title="Nomor Rekening"
        placeholder="Masukkan 4 digit akhir nomor rekening anda"
      />
      <Input
        title="Nama Psikiater"
        placeholder="Alex Andreas, S.Psi, M.Psi, Psikolog"
      />
      <Input title="Durasi" placeholder="45 Menit" />
      <Input title="Upload Bukti Pembayaran" placeholder="Pilih File" />
      <button className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300">
        Isi Formulir Pembayaran
      </button>
    </div>
  );
}

export default PaymentForm