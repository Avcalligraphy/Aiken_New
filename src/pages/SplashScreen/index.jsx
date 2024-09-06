import React from 'react'

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center  h-screen ">
      <img src="/ornaments/blur-circle.png" alt="ornament" className='mt-[100px]' />
      <img src="/icons/logo.png" alt="logo" className="mt-[-340px]" />
      <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[32px] mt-[84px] ">
        AIKEN
      </h1>
    </div>
  );
}

export default SplashScreen