import React from 'react'
import Button from '../../components/molecules/Button';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();
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
            {t("landing")}
          </h1>

          <NavLink to="/login">
            <Button title={t("buttonLanding")} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LandingPage