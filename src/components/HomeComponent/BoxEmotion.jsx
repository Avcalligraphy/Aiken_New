import React from 'react'

const BoxEmotion = () => {
  return (
    <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[1px] rounded-[24px] w-full h-fit shadow-md shadow-[#7A54B7] ">
      <div className=" h-fit bg-white px-[15px] py-[10px] rounded-[24px] flex flex-row gap-[12px] ">
        <img
          alt="mood-icon"
          src="/icons/greenMood.png"
          className="w-[60px] h-[60px] bg-cover "
        />
        <div className="flex flex-col">
          <div>
            <h1 className="font-medium text-[14px] ">Minggu, 21 Juli</h1>
            <h1 className="font-semibold text-[18px] text-[#4D9217] ">
              baik{" "}
              <span className="font-medium text-[10px] text-black ">21:21</span>
            </h1>
            <div className="flex gap-[12px] items-center ">
              <div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
              </div>
              <div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
              </div>
              <div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#88D24E] " />
                  <p className="text-[14px] ">senang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxEmotion