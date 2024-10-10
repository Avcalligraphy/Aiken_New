import React from "react";
import Layout from "../../Layouts";
import BoxDiary from "../../components/molecules/BoxDiary";
import {
  useFetchDataConsultant,
  useFetchDataDoctor,
  useStoreConsultant,
  useStoreDoctor,
} from "../../lib/store";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import BoxHistory from "../../components/molecules/BoxHistory";

const ChatDoctor = ({ active }) => {
  const authUser = useAuthUser();
  const { dataDoctor } = useStoreDoctor();
  const { data } = useStoreConsultant();

  useFetchDataDoctor();
  useFetchDataConsultant();

  const filteredData = data.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username ===
      authUser()?.username
  );

  // Fungsi untuk menggabungkan data
  const mergeData = (filteredData, dataDoctor) => {
    return filteredData.map((item) => {
      const physiotherapyName =
        item.attributes.physicotheraphy.data.attributes.name;
      const doctor = dataDoctor.find(
        (doctor) => doctor.attributes.name === physiotherapyName
      );

      // Mengembalikan objek baru dengan informasi yang digabungkan
      return {
        ...item,
        doctorInfo: doctor ? doctor.attributes : null, // Menyimpan informasi dokter
      };
    });
  };

  const mergedData = mergeData(filteredData, dataDoctor);

  return (
    <Layout title="M. Avav Sabilal Mujtaba">
      <div
        className=" px-[15px] pb-[150px]  "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <div className="flex flex-col gap-[20px]">
          {mergedData && mergedData.length > 0 ? (
            mergedData.map((item, index) => (
              <BoxHistory
                key={item.id} // Menambahkan key untuk setiap elemen
                id={item.id}
                desc={item.attributes.desc}
                date={item.attributes.publishedAt}
                name={item.attributes.physicotheraphy.data.attributes.name}
                doctorPhoto={
                  item.doctorInfo && item.doctorInfo.photo
                    ? item.doctorInfo.photo.data.attributes.url
                    : null
                }
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

export default ChatDoctor;
