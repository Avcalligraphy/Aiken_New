import React from 'react'
import Layout from '../../Layouts'
import BoxFeature from '../../components/HomeComponent/boxFeature';
import BoxEmotion from '../../components/HomeComponent/BoxEmotion';
import BoxReading from '../../components/HomeComponent/BoxReading';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div
          className="w-full h-[165px] rounded-[20px] "
          style={{
            backgroundImage: "url(/images/imageHome.png)",
            backgroundSize: "cover",
          }}
        >
          <div
            className="h-[165px] rounded-[20px] p-[30px] "
            style={{
              backgroundImage: "url(/images/shadowHome.png)",
              backgroundSize: "cover",
            }}
          >
            <img
              className="pt-[30px]"
              src="/ornaments/textIcon.png"
              alt="textIcon"
            />
            <h1 className="text-white font-bold text-[48px] mt-[-56px]  ">
              Aiken
            </h1>
            <p className="text-white text-[14px] font-semibold mt-[10px] ">
              Media terapi interaktif untuk meningkatkan kesehatan mental remaja
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-[20px] ">
          <NavLink to="/mood-assesment">
            <BoxFeature
              title="Mood Asses"
              icon="moodFeature"
              color="bg-[#88D24E]"
            />
          </NavLink>
          <NavLink to="/dear-diary">
            <BoxFeature
              title="Dear Diary"
              icon="iconDiary"
              color="bg-[#9D4760]"
            />
          </NavLink>
          <NavLink to="/psikiater">
            <BoxFeature
              title="My Psikiater"
              icon="iconDoctor"
              color="bg-[#443CC1]"
            />
          </NavLink>
          <NavLink to="/chat-ai">
            <BoxFeature title="AI Chat" icon="iconAI" color="bg-[#7A54B7]" />
          </NavLink>
        </div>
        <div className="flex flex-col w-full gap-[20px] mt-[20px] ">
          <BoxEmotion />
          <BoxEmotion />
          <BoxEmotion />
        </div>
        <div className="flex flex-col gap-[15px] mt-[15px] mb-[200px] ">
          <h1 className="text-black   font-bold text-[20px]  ">
            Reading Corner
          </h1>
          <div className="grid grid-cols-2 gap-[13px]">
            <NavLink to="/reading-corner">
              <BoxReading />
            </NavLink>
            <BoxReading />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home