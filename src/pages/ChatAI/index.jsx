import React from 'react'
import Layout from '../../Layouts'

const ChatAI = ({active = true}) => {
  return (
    <Layout title="Bagaimana mental anda hari ...">
      <div
        className=" px-[15px] pb-[150px]  "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        {active ? (
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
                <div className="w-10 h-10 rounded-full bg-[#7A54B7] flex justify-center items-center">
                  <i className="bx bx-message-rounded text-white text-xl"></i>{" "}
                  {/* Icon */}
                </div>
                <input
                  type="text"
                  className="flex-1 ml-4 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-purple-500"
                  placeholder="Ask me anything..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[1px] rounded-[16px] w-full h-fit shadow-md shadow-[#7A54B7] ">
            <div className="bg-white px-[20px] py-[24px] rounded-[16px] ">
              <div className="flex justify-between items-center  ">
                <h1 className="text-[16px]">Job Interview Tips</h1>
                <h1 className="text-[13px] font-semibold ">11 Agustus 2024</h1>
              </div>
              <div className="w-full shadow-md shadow-[#7A54B7] bg-gradient-to-r from-[#240F41]  to-[#7A54B7] h-[1px] my-[20px] " />
              <div className="flex justify-between items-center  ">
                <h1 className="text-[16px]">Job Interview Tips</h1>
                <h1 className="text-[13px] font-semibold ">11 Agustus 2024</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ChatAI