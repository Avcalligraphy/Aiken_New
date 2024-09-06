import React from 'react'
import Layout from '../../Layouts';
import Button from '../../components/molecules/Button';
import BoxDiary from '../../components/molecules/BoxDiary';
import { NavLink, useLocation } from 'react-router-dom';

const DearDiary = () => {
    const {pathname} = useLocation()
  return (
    <Layout title="Public Diary">
      <div
        className="min-h-screen px-[15px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div className="flex flex-row justify-between items-center mb-[12px] ">
          <div>
            <img
              alt="text-mood"
              src="/ornaments/textMoodIcon.png"
              className="mt-[35px]"
            />
            <h1 className=" mt-[-22px] font-bold text-[18px] ">
              Your Diary has writted
            </h1>
          </div>
          <NavLink to="/public-diary">
            <button
              className={`py-[6px] w-[98px] rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[12px] mt-[12px] `}
            >
              Add Note
            </button>
          </NavLink>
        </div>
        <div className="flex flex-col gap-[20px]">
          <BoxDiary pathname={pathname} />
          <BoxDiary active={false} pathname={pathname} />
        </div>
      </div>
    </Layout>
  );
}

export default DearDiary