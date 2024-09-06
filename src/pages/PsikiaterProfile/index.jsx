import React from 'react'
import Layout from '../../Layouts';
import { NavLink } from 'react-router-dom';

const PsikiaterProfile = () => {
  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pt-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <img alt="text-mood" src="/ornaments/textMoodIcon.png" />
        <h1 className=" mt-[-22px] font-bold text-[20px] ">
          Alex Andreas, S.Psi, M.Psi, Psikolog
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          Pikologi Klinis
        </p>
        <img
          src="/images/imagePsikiater.png"
          alt="image-psikiater"
          className="w-full bg-cover h-[220px] rounded-[20px] mt-[10px]  "
        />
        <div className="flex flex-col mt-[20px]  ">
          <div className="max-w-sm mx-auto p-4 shadow-lg rounded-lg">
            <h1 className="font-bold text-lg text-[#443CC1] ">Rp 50.000</h1>
            <div className="flex flex-row justify-between mt-[10px] ">
              <div>
                <h1 className=" font-semibold text-lg  ">
                  Pengalaman Bekerja:
                </h1>
                <p className="font-semibold text-[#333333] ">3 Tahun</p>
              </div>
              <div>
                <h1 className=" font-semibold text-lg  ">Durasi Konsultasi:</h1>
                <p className="font-semibold text-[#333333] ">45 Menit</p>
              </div>
            </div>
            <div className="mb-4 mt-4">
              <h2 className="text-lg font-semibold">Bidang Keahlian :</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                  Hubungan Asmara
                </span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                  Stress
                </span>
                <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full">
                  Keluarga
                </span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
                  Remaja
                </span>
                <span className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full">
                  Pekerjaan & Karir
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Riwayat Pendidikan :</h2>
              <p>S1 Psikologi</p>
              <p>Universitas Islam Indonesia, 2014</p>
              <p className="mt-2">S2 Psikologi</p>
              <p>Universitas Gadjah Mada, 2019</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Nomor STR :</h2>
              <p>03998764128987123</p>
            </div>

            <NavLink to="/payment">
              <button className="w-full bg-[#240F41] text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-300">
                Make an Appointment
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PsikiaterProfile