import React from 'react'

const InputMood = ({title, icon, active = true , onClick}) => {
  return (
    <div onClick={onClick}
      className={`px-[4px] py-[4px] rounded-[18.5px] ${
        active
          ? "bg-transparent border-dashed border-black border-[1px]"
          : "bg-white shadow-sm shadow-gray-400 "
      } flex items-center  gap-[8px]`}
    >
      <img
        src={`/icons/${active ? "buttonCheck" : "buttonPlus"}.png`}
        alt="check-button"
      />
      <h1 className="text-black text-[14px] font-semibold ">{title}</h1>
    </div>
  );
}

export default InputMood