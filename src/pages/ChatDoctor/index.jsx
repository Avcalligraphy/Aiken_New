import React from 'react'
import Layout from '../../Layouts'

const ChatDoctor = ({active}) => {
  return (
    <Layout title="M. Avav Sabilal Mujtaba">
      <div
        className=" px-[15px] pb-[150px]  "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col justify-between  ">
          {/* Chat content section */}
          <div className="flex flex-col p-4 space-y-4">
            {/* User message */}
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <i className="bx bxs-user-circle text-[32px] text-gray-300 "></i>
                {/* Placeholder for user image */}
                <div className="text-gray-700 text-sm">You</div>
              </div>
              <div className="ml-4 bg-gray-100 p-2 rounded-lg shadow text-sm text-gray-800">
                Hari ini hari apa?
              </div>
            </div>

            {/* AI response */}
            <div className="flex justify-end items-center ">
              <div className=" bg-purple-100 p-2 rounded-lg shadow text-sm text-gray-800">
                Hari ini adalah sabtu, 31 Agustus 2024. Ada yang spesial yang
                kamu rencanakan untuk hari ini?
              </div>
              <img
                src="/icons/logo.png"
                alt="logo"
                className="w-auto h-[35px] ml-4 "
              />
            </div>
          </div>

          {/* Input form at the bottom */}
          <div className="w-full p-4 mt-[380px] ">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 mr-4 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-purple-500"
                placeholder="Ask me anything..."
              />
              <div className="w-10 h-10 rounded-[10px] bg-[#7A54B7] flex justify-center items-center">
                <img alt='send' src='/icons/send.png' className='w-[30px] h-auto ' />

                {/* Icon */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChatDoctor