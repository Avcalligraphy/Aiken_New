import React from 'react'
import Layout from '../../Layouts';
import { NavLink, useLocation } from 'react-router-dom';

const PsikiaterProfile = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; // Ambil data doctor dari state
  console.log(doctor);
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
          {doctor?.attributes?.name}
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          {doctor?.attributes?.degree}
        </p>
        <div className="flex justify-center">
          <img
            src={
              `https://admin.aikenhealth.id` +
              doctor?.attributes?.photo?.data?.attributes?.url
            }
            alt="image-psikiater"
            className="w-[220px] bg-cover h-[180px] rounded-[20px] mt-[10px]  "
          />
        </div>
        <div className="flex flex-col mt-[20px]  ">
          <div className="max-w-sm mx-auto p-4 shadow-lg rounded-lg">
            <h1 className="font-bold text-lg text-[#443CC1] ">
              Rp {doctor?.attributes?.price}
            </h1>
            <div className="flex flex-row justify-between mt-[10px] ">
              <div>
                <h1 className=" font-semibold text-lg  ">
                  Pengalaman Bekerja:
                </h1>
                <p className="font-semibold text-[#333333] ">
                  {doctor?.attributes?.experience} Tahun
                </p>
              </div>
              <div>
                <h1 className=" font-semibold text-lg  ">Durasi Konsultasi:</h1>
                <p className="font-semibold text-[#333333] ">
                  {doctor?.attributes?.duration} Menit
                </p>
              </div>
            </div>
            <div className="mb-4 mt-4">
              <h2 className="text-lg font-semibold">Bidang Keahlian :</h2>
              <div className="flex flex-wrap gap-2 mt-2">
  
                {doctor?.attributes?.field.map((item, index) => {
                  const bgColors = [
                    "bg-blue-200",
                    "bg-gray-200",
                    "bg-pink-200",
                    "bg-green-200",
                    "bg-teal-200",
                  ];
                  const textColors = [
                    "text-blue-800",
                    "text-gray-800",
                    "text-pink-800",
                    "text-green-800",
                    "text-teal-800",
                  ];

                  const bgColor = bgColors[index % bgColors.length];
                  const textColor = textColors[index % textColors.length];
                  return (
                    <span
                      className={`${bgColor} ${textColor} px-3 py-1 rounded-full`}
                      key={index}
                    >
                      {item.field}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Riwayat Pendidikan :</h2>
              {doctor?.attributes?.educational.map((item) => (
                <div>
                  <p>{item.degree}</p>
                  <p>
                    {item.institution}, {item.year}
                  </p>
                </div>
              ))}
            </div>

            {/* <div className="mb-4">
              <h2 className="text-lg font-semibold">Nomor STR :</h2>
              <p>03998764128987123</p>
            </div> */}

            <NavLink to="/payment-rules" state={{ doctor: doctor }}>
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