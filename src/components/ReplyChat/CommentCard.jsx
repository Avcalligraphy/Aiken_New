import React from 'react'

const CommentCard = ({name, date, content }) => {
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    };
  return (
    <div className="w-full" style={{ paddingLeft: `20px` }}>
      <div className="my-5 p-6  bg-purple-100  rounded-lg shadow">
        <div className="flex flex-col  mb-8">
          {/* <img src="/imgs/avav-square.jpg" className="w-6 h-6 rounded-full" /> */}
          <p className="line-clamp-1 text-[16px] font-semibold ">{name}</p>
          <p className="min-w-fit text-[14px] text-gray-600">
            {formatDate(date)}
          </p>
        </div>

        <p className=" text-[16px] ">{content}</p>
      </div>
    </div>
  );
}

export default CommentCard