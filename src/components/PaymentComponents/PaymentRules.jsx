import React from 'react'
import Input from '../molecules/Input';

const PaymentRules = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" rounded-lg  max-w-md w-full">
        <h1 className="text-red-500 font-bold  mb-4">
          Harap baca dan cermati panduan pembayaran dibawah ini dengan
          seksama!!!
        </h1>

        {/* Step 1 */}
        <div className="mb-4">
          <Input
            title="1. Pilih rekening tujuan"
            placeholder="9888876510 Mandiri a.n Aiken Project"
          />
          <p className="text-gray-600 mt-2">
            Disini contohnya si pengguna akan melakukan pembayaran dengan
            transfer ke Bank Mandiri a.n Aiken Project.
          </p>
        </div>

        {/* Step 2 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">2. Melakukan Pembayaran</h2>
          <p className="text-gray-600">
            Lakukan pembayaran melalui transfer kepada nomor rekening tujuan
            yang telah dipilih sesuai dengan nominal yang ada pada deskripsi
            psikiater.
          </p>
        </div>

        {/* Step 3 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">3. Simpan Bukti Transaksi</h2>
          <p className="text-gray-600">
            Jika sudah berhasil, jangan lupa untuk menangkap layar sebagai bukti
            dari hasil transaksi untuk nantinya diunggah melalui formulir
            pembayaran.
          </p>
        </div>

        {/* Step 4 */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">4. Isi Formulir Pembayaran</h2>
          <p className="text-gray-600">
            <span className="font-bold text-black">
              Jika sudah berhasil, jangan lupa untuk menangkap layar sebagai
              bukti dari hasil transaksi
            </span>{" "}
            untuk nantinya diunggah melalui formulir pembayaran.
          </p>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300 shadow-md shadow-[#7A54B7] ">
          Payment
        </button>
      </div>
    </div>
  );
}

export default PaymentRules