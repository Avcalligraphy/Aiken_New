import React from 'react'
import Layout from '../../Layouts'

const ReadingPage = () => {
  return (
    <Layout title="Reading Corner">
      <div
        className="px-[15px] min-h-screen flex flex-col "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[24px] mb-[15px] ">
          Bentuk Cinta Pada Diri Sendiri
        </h1>
        <div className="flex flex-row gap-[6px] items-center  mb-[20px]">
          <img
            src="/images/profile.png"
            className=" w-[29px] h-[29px] bg-cover rounded-full "
          />
          <div className="flex flex-col">
            <h1 className=" font-semibold text-[10px] ">
              Muhammad Avav Sabilal Mujtaba
            </h1>
            <p className=" text-[#757575] text-[8px] font-semibold ">
              Aug 31, 2024
            </p>
          </div>
        </div>
        <img
          src="/images/imageReading.png"
          className="w-full h-[209px] bg-cover rounded-[20px] "
        />
        <div>
          <h1 className=" font-medium text-[12px] mt-[17px] mb-[200px] text-justify ">
            Cinta pada diri sendiri adalah fondasi penting dalam menjalani
            kehidupan yang sehat dan bahagia. Pertama-tama, cinta pada diri
            sendiri adalah tentang menerima diri kita apa adanya, dengan segala
            kelebihan dan kekurangan. Ini berarti menghargai keunikan dan
            nilai-nilai yang kita miliki tanpa merasa perlu untuk membandingkan
            diri dengan orang lain. Saat kita belajar untuk menerima dan
            mencintai diri sendiri, kita dapat merasa lebih percaya diri dan
            terbebas dari tekanan untuk selalu mencari persetujuan dari orang
            lain. <br /> <br />
            Selanjutnya, cinta pada diri sendiri mencakup memperhatikan
            kebutuhan dan kesejahteraan kita sendiri. Ini termasuk merawat tubuh
            dan pikiran kita dengan memberikan istirahat yang cukup, pola makan
            yang sehat, dan olahraga yang teratur. Saat kita mengutamakan
            kesejahteraan diri sendiri, kita memberi isyarat kepada diri sendiri
            bahwa kita layak mendapatkan perhatian dan kasih sayang yang sama
            seperti yang kita berikan kepada orang lain. <br /> <br />
            Selain itu, cinta pada diri sendiri melibatkan pembangunan hubungan
            yang sehat dengan diri kita sendiri. Ini berarti mengembangkan
            pemahaman yang lebih dalam tentang siapa kita sebenarnya, apa yang
            kita inginkan, dan apa yang membuat kita bahagia. Dengan
            mempraktikkan introspeksi dan refleksi secara teratur, kita dapat
            memperkuat ikatan dengan diri sendiri dan menjadi lebih sadar akan
            kebutuhan dan keinginan internal kita.
          </h1>
        </div>
      </div>
    </Layout>
  );
}

export default ReadingPage