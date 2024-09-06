import React from 'react'
import Layout from '../../Layouts';

const Profile = () => {
  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pb-[200px] flex flex-col "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div className="flex  justify-center mb-[10px] ">
          <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[2px] rounded-full h-fit shadow-md shadow-[#7A54B7]  ">
            <div className="bg-white rounded-full p-[7px] ">
              <img
                alt="profile"
                src="/images/profile.png"
                className=" w-[126px] h-[126px] bg-cover rounded-full "
              />
            </div>
          </div>
        </div>
        <p className="text-center font-semibold text-[14px] text-[#858585] ">
          avavsabilalmujtaba@gmail.com
        </p>
        <h1 className="text-center font-semibold text-[20px]  ">
          M. Avav Sabilal Mujtaba
        </h1>
        <div className="flex flex-col w-full mt-[46px] ">
          <div className="flex justify-between items-center mb-[15px] ">
            <div className="flex flex-row items-center gap-[16px] ">
              <i className="bx bx-user-circle text-[24px] text-[#7A54B7] "></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px] ">
                  Name
                </h1>
                <p className="font-medium text-[12px] ">
                  Muhammad Avav Sabilal Mujtaba
                </p>
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7] "></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41]  to-[#7A54B7] h-[2px] " />
        </div>
        <div className="flex flex-col w-full mt-[18px] ">
          <div className="flex justify-between items-center mb-[15px] ">
            <div className="flex flex-row items-center gap-[16px] ">
              <i className="bx bxs-phone text-[24px] text-[#7A54B7] "></i>
              <div>
                <h1 className="text-[#240F41] font-semibold text-[16px] mb-[2px] ">
                  Contact Number
                </h1>
                <p className="font-medium text-[12px] ">
                  +62 812 1398 6906
                </p>
              </div>
            </div>
            <i className="bx bx-chevron-right text-[20px] text-[#7A54B7] "></i>
          </div>
          <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41]  to-[#7A54B7] h-[2px] " />
        </div>
      </div>
    </Layout>
  );
}

export default Profile