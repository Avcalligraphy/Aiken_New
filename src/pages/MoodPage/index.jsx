import React from 'react'
import Layout from '../../Layouts'
import InputMood from '../../components/molecules/InputMood';
import FormAsses from '../../components/MoodAssesmentComponent/FormAsses';
import Input from '../../components/molecules/Input';
import Button from '../../components/molecules/Button';

const MoodAssesment = () => {
  return (
    <Layout>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <img className="" src="/images/emotion.png" />
        <div className="flex justify-center">
          <h1 className="text-[32px] font-bold leading-[28px] text-center max-w-[259px]  ">
            What do you feel today ?
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-[20px] mt-[22px] px-[15px]  ">
          <InputMood title="Fatigue" active />
          <InputMood title="Pain" active={false} />
          <InputMood title="Apathy" active={false} />
          <InputMood title="Anxiety" active={false} />
          <InputMood title="Sadness" active />
          <InputMood title="Ennui" active={false} />
        </div>
        <div className="mt-[40px] px-[15px] pb-[200px] ">
          <img alt="text-mood" src="/ornaments/textMoodIcon.png" />
          <h1 className=" mt-[-22px] font-bold text-[18px] ">
            Asses your self
          </h1>
          <p className="font-medium text-[#949494] text-[13px] ">
            Personalised for your self
          </p>
          <div className=" mt-[18px] gap-[30px] flex flex-col  ">
            <FormAsses title="Are you able to focus on what you’re doing ?" />
            <FormAsses
              active={false}
              title="Do you feel capable of making decision ?"
            />
          </div>
          <div className="flex flex-col gap-[26px] mt-[24px] ">
            <Input
              title="Catatan Singkat"
              icon="notepad"
              placeholder="Tambahkan Catatan..."
            />
            <Input title="Photo" icon="camera" placeholder="Ambil Photo" />
            <Input title="Rekam Suara" icon="microphone" placeholder="Sentuh untuk Merekam" />
            <Button title="Save Data" width="w-[171px]" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MoodAssesment