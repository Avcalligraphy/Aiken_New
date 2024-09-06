import React from 'react'
import Layout from '../../Layouts'
import Input from '../../components/molecules/Input';
import PaymentCard from '../../components/PaymentComponents/PaymentCard';
import PaymentForm from '../../components/PaymentComponents/PaymentForm';

const PaymentPage = () => {
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
          Requirement Payment
        </h1>
        <PaymentForm />
      </div>
    </Layout>
  );
}

export default PaymentPage