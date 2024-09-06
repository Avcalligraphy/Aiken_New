import React, { useState } from "react";

const AddDiary = () => {
  const [posting, setPosting] = useState(false);

  const handlePost = () => {
    setPosting(true);
    // Lakukan logika posting di sini
    setTimeout(() => setPosting(false), 2000); // Simulasi posting
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg  p-4">
      <div className="flex justify-between items-center">
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">✖</span>
        </button>
        <button
          className={`${
            posting
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841]"
          } text-white font-semibold py-1 px-4 rounded-full transition-colors duration-300`}
          onClick={handlePost}
        >
          {posting ? "Posting..." : "Posting"}
        </button>
      </div>
      <textarea
        className="w-full mt-4 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows="3"
        placeholder="Apa yang sedang anda rasakan hari ini..."
      ></textarea>
    </div>
  );
};

export default AddDiary;
