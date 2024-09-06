import React from 'react'
import Input from '../molecules/Input';

const PaymentCard = () => {
  return (
    <div className="flex mt-4 items-center justify-center">
      <div className="rounded-lg  max-w-md w-full">
        <p className=" text-black mb-4  ">
          Silakan pilih nomor rekening tujuan dan lakukan pembayaran sesuai
          dengan nominal pada deskripsi psikiater!
        </p>

        {/* Step 1 */}
        <div className="mb-4">
          <Input
            title="Pilih Nomor Rekening Tujuan"
            placeholder="9888876510 Mandiri a.n Aiken Project"
          />
        </div>

        {/* Payment Amount */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">Nominal yang harus dibayarkan</h2>
          <p className="text-[#443CC1] text-center text-3xl font-bold">
            Rp 50.000
          </p>
        </div>

        {/* Reminder */}
        <p className="text-gray-600 mb-6">
          Jangan lupa untuk menyimpan bukti pembayaran pada perangkat anda.
        </p>

        {/* Payment Form Button */}
        <button className="w-full bg-[#240F41] text-white py-3 rounded-md mt-4 hover:bg-purple-600 transition duration-300">
          Isi Formulir Pembayaran
        </button>
      </div>
    </div>
  );
}

export default PaymentCard