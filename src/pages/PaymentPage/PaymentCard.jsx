import React, { useState } from "react";
import Layout from "../../Layouts";
import Input from "../../components/molecules/Input";
import PaymentCard from "../../components/PaymentComponents/PaymentCard";
import PaymentForm from "../../components/PaymentComponents/PaymentForm";
import PaymentRules from "../../components/PaymentComponents/PaymentRules";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";

const PaymentCardPage = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; // Ambil data doctor dari state
  const auth = useAuthUser();
  const {t} = useTranslation()
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
          {t("requirement_payment")}
        </h1>
        <PaymentCard price={doctor?.attributes?.price} doctor={doctor} />
      </div>
    </Layout>
  );
};

export default PaymentCardPage;
