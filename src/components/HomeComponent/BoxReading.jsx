import React from 'react'

const BoxReading = ({photo, title, keyId}) => {
  return (
    <div
      key={keyId}
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
      }}
      className=" w-[156px] h-[116px] flex flex-col justify-end rounded-[16px] py-[14px] px-[4px] translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1   "
    >
      <h1 className="text-black  font-semibold text-[12px] text-center backdrop-blur-xl bg-white/30  ">
        {title}
      </h1>
    </div>
  );
}

export default BoxReading