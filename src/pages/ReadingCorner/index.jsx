import React from 'react'
import Layout from '../../Layouts'
import { useLocation } from 'react-router-dom';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ReadingPage = () => {
  const location = useLocation();
  const { reading } = location.state || {}; // Ambil data doctor dari state

  return (
    <Layout title="Reading Corner">
      <div
        className="px-[15px] min-h-screen flex flex-col "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[24px] mb-[15px] ">
          {reading.attributes.title}
        </h1>
        <div className="flex flex-row gap-[6px] items-center  mb-[20px]">
          <img
            src="/images/profile.jpg"
            className=" w-[29px] h-[29px] bg-cover rounded-full "
          />
          <div className="flex flex-col">
            <h1 className=" font-semibold text-[10px] ">
              {reading.attributes.writter}
            </h1>
            <p className=" text-[#757575] text-[8px] font-semibold ">
              {reading.attributes.publishedAt}
            </p>
          </div>
        </div>
        <img
          src={
            `https://admin.aikenhealth.id` +
            reading.attributes.photo.data.attributes.url
          }
          className="w-full h-[209px] bg-cover rounded-[20px] "
        />
        <div>
          <div className=" font-medium text-[14px] mt-[17px] mb-[200px] text-justify prose ">
            <BlocksRenderer content={reading?.attributes?.desc} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReadingPage