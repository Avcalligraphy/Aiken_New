import React from "react";
import Layout from "../../Layouts";
import Button from "../../components/molecules/Button";
import BoxDiary from "../../components/molecules/BoxDiary";
import { useLocation } from "react-router-dom";
import { useFetchData, useStore } from "../../lib/store";

const PublicDiary = () => {
  const { pathname } = useLocation();
  const { data } = useStore();
  useFetchData();
  return (
    <Layout title="Dear Diary">
      <div
        className="min-h-screen px-[15px] pb-[200px] "
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
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <BoxDiary
                keyId={item.id}
                title={item.attributes.title}
                diary={item.attributes.diary}
                date={item.attributes.publishedAt}
                written={
                  item.attributes.users_permissions_user.data.attributes
                    .username
                }
                pathname={pathname}
                // Selang-seling active berdasarkan index
                {...(index % 2 === 0 ? {} : { active: false })}
              />
            ))
          ) : (
            <p>No entries found for the specified username.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PublicDiary;
