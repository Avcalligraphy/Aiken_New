import React from 'react'
import Button from '../../components/molecules/Button';

const LandingPage = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/images/imageLanding.png)",
        backgroundSize: "cover",
      }}
      className="h-screen "
    >
      <div
        style={{
          backgroundImage: "url(/images/shadowLanding.png)",
          backgroundSize: "cover",
        }}
        className="h-screen px-[21px] flex gap-[23px]  "
      >
        <div className="w-[16px] h-full bg-gradient-to-b from-[#240F41]  to-[#FFFFFF] " />
        <div className="flex flex-col">
          <div className="flex items-center gap-[7px] mt-[84px] ">
            <img src="/icons/logoLanding.png" alt="logoLanding" />
            <h1 className="text-[#BCA8CF] font-bold text-[24px] ">AIKEN.id</h1>
          </div>
          <h1 className=" text-[#BCA8CF] text-[16px] font-medium mt-[20px] mb-[30px] ">
            Media terapi interaktif untuk <br /> meningkatkan kesehatan mental
            remaja
          </h1>

          <Button title="Go Now ..."/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage