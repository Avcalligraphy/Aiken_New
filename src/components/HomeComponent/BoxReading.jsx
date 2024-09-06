import React from 'react'

const BoxReading = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/images/imageReading.png)",
        backgroundSize: "cover",
      }}
      className=" w-[156px] h-[116px] flex flex-col justify-end rounded-[16px] py-[14px] px-[4px] translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1   "
    >
      <h1 className="text-white font-semibold text-[12px] text-center  ">
        Selflove: Bentuk Cinta Kepada Diri Sendiri
      </h1>
    </div>
  );
}

export default BoxReading