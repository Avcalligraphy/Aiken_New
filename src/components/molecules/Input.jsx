import React from 'react'

const Input = ({title, icon, placeholder, value, onChange, type, required}) => {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="flex flex-row gap-[14px] items-center ">
        {icon ? <i className={`bx bxs-${icon} text-[20px] text-[#240F41]`}></i> : null}
        <h1 className=" text-[#240F41] font-bold text-[16px] ">{title}</h1>
      </div>
      <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[1px] rounded-[24px] w-full h-fit shadow-md shadow-[#7A54B7]">
        <div className="h-fit bg-white rounded-[24px] px-[23px] py-[14px] ">
          <input
            value={value}
            className="w-full bg-white text-[16px] placeholder-[#676767] text-black rounded-[24px]  "
            placeholder={placeholder}
            onChange={onChange}
            type={type}
          />
        </div>
      </div>
    </div>
  );
}

export default Input