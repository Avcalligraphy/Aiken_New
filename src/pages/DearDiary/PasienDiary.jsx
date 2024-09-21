import React, { useEffect } from "react";
import Layout from "../../Layouts";
import Button from "../../components/molecules/Button";
import BoxDiary from "../../components/molecules/BoxDiary";
import { NavLink, useLocation } from "react-router-dom";
import { useFetchData, useStore } from "../../lib/store";
import { useAuthUser } from "react-auth-kit";
import BoxDiaryPasien from "../../components/molecules/BoxDiaryPasien";

const PasienDiary = () => {
  const { pathname } = useLocation();
  const auth = useAuthUser();
  const location = useLocation();
  const { dataUser } = location.state || {};

  const { data } = useStore();
  useFetchData(); // Call the custom hook to fetch data
  const filteredData = data.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username === dataUser
  );
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
              Pasien Diary has writted
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <BoxDiaryPasien
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
          {/* <BoxDiary pathname={pathname} />
          <BoxDiary active={false} pathname={pathname} /> */}
        </div>
      </div>
    </Layout>
  );
};

export default PasienDiary;
