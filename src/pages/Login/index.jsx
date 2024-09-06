import React from 'react'
import Button from '../../components/molecules/Button';

const Login = () => {
  return (
    <div className="h-screen">
      <img src="/ornaments/blurTop.png" alt="blurTop" />
      <div className="flex px-[21px] mt-[-280px] w-full ">
        <div className="w-[16px] h-[650px] bg-gradient-to-b from-[#240F41]  to-[#FFFFFF]" />
        <div className="flex flex-col w-full  ">
          <div className="flex flex-row items-center justify-center gap-[8px] pt-[63px] w-full ">
            <img
              src="/icons/logo.png"
              alt="logo"
              className="w-auto h-[58px]  "
            />
            <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[24px]">
              AIKEN.id
            </h1>
          </div>
          <div className="flex flex-col pl-[35px] mt-[48px] w-full  ">
            <h1 className="font-medium text-[16px] ">Email Address</h1>
            <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center px-[17px] py-[16px] gap-[16px] mt-[17px] ">
              <i className="bx bxs-envelope text-[20px] text-[#7A54B7] "></i>
              <input
                className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black  "
                placeholder="Your Email Address"
              />
            </div>
          </div>
          <div className="flex flex-col pl-[35px] mt-[20px] w-full mb-[30px] ">
            <h1 className="font-medium text-[16px] ">Password</h1>
            <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center justify-center px-[17px] py-[16px] gap-[16px] mt-[17px] ">
              <i className="bx bxs-lock-alt text-[#7A54B7] text-[20px] "></i>
              <input
                className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black  "
                placeholder="Your Password"
              />
            </div>
          </div>
          <div className="flex flex-col pl-[35px] ">
            <button
              className={`py-[11px] w-[171px] rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[16px] `}
            >
              Sign In
            </button>
            <h1 className=" text-[16px] font-bold mt-[26px] ">
              Don’t Have Aiken Account ?{" "}
              <span className=" text-[#7A54B7] ">Sign Up</span>
            </h1>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-[-180px]  '>
        <img src="/ornaments/blurBottom.png" alt="blurBottom" className='w-auto h-[200px]' />
      </div>
    </div>
  );
}

export default Login