const FormAsses = ({ active = true, title, onInputChange, value }) => {
  return (
    <div
      className={`${
        active
          ? "bg-[#DCEDF9] border-[#9BADBA]"
          : "bg-[#E6F6D9] border-[#B3C0A8]"
      } rounded-[30px] border-[1px] w-full p-[20px] `}
    >
      <h1 className="font-semibold text-[20px] leading-[20px]  ">{title}</h1>
      <div className="flex flex-col w-full mt-[23px] gap-[10px]  ">
        <div className="bg-[#EEF6FC] rounded-[23px] w-full flex items-center px-[13px] py-[10px] gap-[9px] border-[1px] border-[#787878] ">
          <input
            onChange={(e) => onInputChange(e.target.value)} // Pass the input value to onInputChange
            className="w-full bg-[#EEF6FC] text-[14px] placeholder-[#676767] text-black font-medium  "
            placeholder="Your Asses"
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAsses;
