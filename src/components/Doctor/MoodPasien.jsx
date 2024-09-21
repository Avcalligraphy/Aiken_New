import React from 'react'
import Layout from '../../Layouts';
import { useLocation } from 'react-router-dom';
import { useFetchDataMood, useStoreMood } from '../../lib/store';
import BoxEmotion from '../HomeComponent/BoxEmotion';

const MoodPasien = () => {
    const location = useLocation();
    const { dataUser } = location.state || {};
    const { dataMood } = useStoreMood();
    useFetchDataMood();
     const filteredData = dataMood.filter(
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
              Mood Journey Pasien
            </h1>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[20px] mt-[20px] ">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <BoxEmotion
                key={index}
                date={item.attributes.publishedAt}
                title={item.attributes.title}
                dataMood={item.attributes.branchFeeling}
              />
            ))
          ) : (
            <p>No entries found for the specified .</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MoodPasien