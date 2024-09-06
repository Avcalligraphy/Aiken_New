import React from 'react'
import Layout from '../../Layouts';

const ConsultationDetail  = () => {
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
          <div className="flex items-center justify-center ">
            <div className=" max-w-lg w-full">
              {/* Consultation Date */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-600">
                  Tanggal Konsultasi
                </h2>
                <p className="text-purple-600">31 Agustus 2024</p>
              </div>

              {/* Psychiatrist's Suggestions */}
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-2">Saran Dari Psikiater</h3>

                {/* Suggestion 1 */}
                <div className="mb-4">
                  <h4 className="font-semibold">
                    1. Rawat dirimu dengan cermat
                  </h4>
                  <p className="text-gray-600">
                    Lakukan aktivitas yang menenangkan seperti meditasi atau
                    yoga untuk mengurangi stres, serta menjaga kebersihan diri
                    dan pola makan yang sehat.
                  </p>
                </div>

                {/* Suggestion 2 */}
                <div className="mb-4">
                  <h4 className="font-semibold">
                    2. Kelola Media Sosial dengan sehat
                  </h4>
                  <p className="text-gray-600">
                    Gunakan media sosial secara bijak, membatasi waktu layar,
                    dan tidak membandingkan kehidupan mereka dengan gambaran
                    sempurna yang sering kali ditampilkan di media sosial.
                  </p>
                </div>

                {/* Suggestion 3 */}
                <div className="mb-4">
                  <h4 className="font-semibold">
                    3. Pahami kesehatan mentalmu secara mendalam
                  </h4>
                  <p className="text-gray-600">
                    Gunakan media sosial secara bijak, membatasi waktu layar,
                    dan tidak membandingkan kehidupan mereka dengan gambaran
                    sempurna yang sering kali ditampilkan di media sosial.
                  </p>
                </div>
              </div>

              {/* Medication Recommendation */}
              <div className="mb-4">
                <h4 className="font-bold text-lg">Rekomendasi Obat:</h4>
                <p className="text-gray-600">
                  Fluoxetine, Methylphenidate, Risperidone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ConsultationDetail