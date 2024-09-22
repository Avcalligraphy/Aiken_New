import React from 'react'
import Layout from '../../Layouts'
import PsikiaterCard from '../../components/molecules/PsikiaterCard';
import { NavLink } from 'react-router-dom';
import PsikiaterProfile from '../PsikiaterProfile';
import { useFetchDataDoctor, useStoreDoctor } from '../../lib/store';

const Psikiater = () => {
  const { dataDoctor } = useStoreDoctor();
  useFetchDataDoctor(); // Call the custom hook to fetch data
  return (
    <Layout>
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
              Pyschoteraphist
            </h1>
            <p className="font-medium text-[#949494] text-[13px] ">
              Personalised for your doctor
            </p>
          </div>
          {/* <NavLink to="/chat-doctor">
            <i className="bx bx-chat text-[20px] mt-[15px] "></i>
          </NavLink> */}
        </div>
        <div className="flex flex-col gap-[20px]">
          {/* <NavLink to="/psikiater-profile">
            <PsikiaterCard />
          </NavLink> */}
          {dataDoctor && dataDoctor.length > 0 ? (
            dataDoctor.map((item, index) => (
              <NavLink
                key={item.id}
                to={`/psikiater-profile`}
                state={{ doctor: item }} // Mengirim data doctor melalui state
              >
                <PsikiaterCard
                  keyId={item.id}
                  name={item.attributes.name}
                  stars={item.attributes.star}
                  degree={item.attributes.degree}
                  photo={
                    `https://admin.aikenhealth.id` +
                    item.attributes.photo.data.attributes.url
                  }
                />
              </NavLink>
            ))
          ) : (
            <p>No entries found for the specified psikater.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Psikiater