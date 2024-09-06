import React from 'react'

const FormAsses = ({active =  true, title}) => {
  return (
    <div
      className={`${
        active
          ? "bg-[#DCEDF9] border-[#9BADBA]"
          : "bg-[#E6F6D9] border-[#B3C0A8]"
      } rounded-[30px] border-[1px] w-full p-[20px] `}
    >
      <h1 className="font-semibold text-[20px] leading-[20px]  ">
        {title}
      </h1>
      <div className="flex flex-col w-full mt-[23px] gap-[10px]  ">
        <div className="bg-[#EEF6FC] rounded-[23px] w-full flex items-center px-[13px] py-[10px] gap-[9px] border-[1px] border-[#787878] ">
          <div className="h-[16px] w-[16px] rounded-full border-[1.5px] border-[#787878] " />
          <input
            className="w-full bg-[#EEF6FC] text-[14px] placeholder-[#676767] text-black font-medium  "
            placeholder="Better than usual"
          />
        </div>
        <div className="bg-[#EEF6FC] rounded-[23px] w-full flex items-center px-[13px] py-[10px] gap-[9px] border-[1px] border-[#787878] ">
          <div className="h-[16px] w-[16px] rounded-full border-[1.5px] border-[#000] flex items-center justify-center ">
            <div className=" w-[8px] h-[8px] rounded-full bg-black  " />
          </div>
          <input
            className="w-full bg-[#EEF6FC] text-[14px] placeholder-[#676767] text-black font-medium  "
            placeholder="Same than usual"
          />
        </div>
        <div className="bg-[#EEF6FC] rounded-[23px] w-full flex items-center px-[13px] py-[10px] gap-[9px] border-[1px] border-[#787878] ">
          <div className="h-[16px] w-[16px] rounded-full border-[1.5px] border-[#787878] " />
          <input
            className="w-full bg-[#EEF6FC] text-[14px] placeholder-[#676767] text-black font-medium  "
            placeholder="Less than usual"
          />
        </div>
      </div>
    </div>
  );
}

export default FormAsses