import React from 'react'
import BoxTracker from '../../components/MoodTrackerComponent/BoxTracker'
import Layout from '../../Layouts'
import BoxActivitie from '../../components/MoodTrackerComponent/BoxActivitie';

const MoodTracker = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
        className="min-h-screen px-[15px] pb-[200px]  "
      >
        <img src="/images/moodTracker.png" />
        <img
          alt="text-mood"
          src="/ornaments/textMoodIcon.png"
          className="mt-[35px]"
        />
        <h1 className=" mt-[-22px] font-bold text-[18px] ">
          Activities designed for you
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          Personalised for your self
        </p>
        <div className="flex flex-row gap-[20px] mt-[10px] ">
          <BoxActivitie />
          <BoxActivitie />
        </div>
      </div>
    </Layout>
  );
}

export default MoodTracker