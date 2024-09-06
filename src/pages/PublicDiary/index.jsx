import React from "react";
import Layout from "../../Layouts";
import Button from "../../components/molecules/Button";
import BoxDiary from "../../components/molecules/BoxDiary";
import { useLocation } from "react-router-dom";

const PublicDiary = () => {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <Layout title="Dear Diary">
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
              Confide in Friends
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <BoxDiary pathname={pathname} />
          <BoxDiary active={false} pathname={pathname} />
        </div>
      </div>
    </Layout>
  );
};

export default PublicDiary;
