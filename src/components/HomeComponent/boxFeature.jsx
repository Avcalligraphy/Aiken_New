import React from 'react'

const BoxFeature = ({title, icon, color}) => {
  return (
    <button
      className={` w-[86px] h-[110px] rounded-[30px] flex flex-col justify-center items-center gap-[11px] ${color} translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1 `}
    >
      <img src={`/icons/${icon}.png`} alt="mood-feature" />
      <h1 className="text-[14px] text-white font-light text-center max-w-[44px] ">
        {title}
      </h1>
    </button>
  );
}

export default BoxFeature