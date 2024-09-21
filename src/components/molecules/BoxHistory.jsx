import React from 'react'

const BoxHistory = ({active = true}) => {
  return (
    <div className="bg-gradient-to-r from-[#240F41] to-[#7A54B7] p-[1px] rounded-[20px] w-full h-fit shadow-md shadow-[#7A54B7]">
      <div
        className={`${
          active ? "bg-gradient-to-b from-[#321A5C] to-[#150629]" : "bg-white"
        } px-[20px] py-[15px] rounded-[20px]`}
      >
          <div className="flex flex-row gap-[6px] items-center ">
            <img
              src="/images/profile.jpg"
              className=" w-[29px] h-[29px] bg-cover rounded-full "
            />
            <div className="flex flex-col">
              <h1
                className={`font-semibold text-[10px] ${
                  active ? "text-white" : null
                }`}
              >
                Si Paling Bahagia
              </h1>
              <p className=" text-[#757575] text-[8px] font-semibold ">
                Aug 31, 2024
              </p>
            </div>
          </div>
        <div className="flex flex-row justify-between items-center">
          <h1
            className={`${
              active
                ? "bg-gradient-to-r from-[#89C0FF]  to-[#DFCCFF]"
                : "bg-gradient-to-r from-[#7A54B7]  to-[#240F41]"
            } inline-block text-transparent bg-clip-text font-bold text-[18px] my-[12px]`}
          >
            Bentuk Cinta Pada Diri Sendiri
          </h1>
        </div>
        <h1
          className={`font-medium text-[11px] ${active ? "text-white" : null}`}
        >
          Cinta pada diri sendiri adalah fondasi penting dalam menjalani
          kehidupan yang sehat dan bahagia. Pertama-tama, cinta pada diri
          sendiri adalah tentang menerima diri kita apa adanya, dengan segala
          kelebihan dan kekurangan. Ini berarti menghargai keunikan dan
          nilai-nilai yang kita miliki tanpa merasa perlu untuk membandingkan
          diri ......
        </h1>
      </div>
    </div>
  )
}

export default BoxHistory