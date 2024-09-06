import React from 'react'

const BoxActivitie = () => {
  return (
    <div className=" bg-[#FCEDCA] p-[10px] rounded-[20px] ">
      <img
        src="/images/imageHome.png"
        alt="image-home"
        className="w-full bg-cover h-[124px] rounded-[24px] "
      />
      <div className=" flex flex-row justify-between items-center mt-[10px]  ">
        <h1 className="font-semibold text-[15px] ">Rock music</h1>
        <i className="bx bx-play text-[20px] "></i>
      </div>
      <div className=" flex flex-row gap-[13px] items-center mt-[5px] ">
        <div className="flex flex-row items-center gap-[5px] ">
          <i className="bx bx-stopwatch text-[10px] "></i>
          <h1 className=" text-[10px] text-[#A9A9A9] font-medium ">5.05 m</h1>
        </div>
        <div className="flex flex-row items-center gap-[5px] ">
          <i className="bx bx-volume-full text-[10px] "></i>
          <h1 className="font-medium text-[10px] text-[#A9A9A9] ">Audio</h1>
        </div>
      </div>
    </div>
  );
}

export default BoxActivitie