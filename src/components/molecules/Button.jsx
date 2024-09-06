import React from 'react'

const Button = ({ title, width = "w-[157px]" }) => {
  return (
    <button
      className={`py-[11px] ${width} rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[16px] `}
    >
      {title}
    </button>
  );
};

export default Button