import React from 'react'
import Navbar from './Navbar';

const Layout = ({ children, title = "Aug 2024" }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-[#240F41] rounded-b-[30px] flex flex-row py-[23px] px-[20px] ">
        <div className="flex gap-[5px] items-center justify-center ">
          <i className="bx bx-chevron-left text-white  "></i>
          <h1 className="text-white font-bold text-[16px]  ">{title}</h1>
          <i className="bx bx-chevron-right text-white "></i>
        </div>
      </div>
      <div className="pt-[20px] ">{children}</div>
      <Navbar />
    </div>
  );
};

export default Layout