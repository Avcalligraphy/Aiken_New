import React from "react";

const BoxTracker = () => {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const moods = [
    { day: "Mo", level: "Great" },
    { day: "Tu", level: "Good" },
    { day: "We", level: "Neutral" },
    { day: "Th", level: "Awful" },
    { day: "Fr", level: "Neutral" },
    { day: "Sa", level: "Bad" },
    { day: "Su", level: "Good" },
  ];

  const moodLevels = ["Awful", "Bad", "Neutral", "Good", "Great"];

  const getMoodClass = (level) => {
    switch (level) {
      case "Great":
        return "bg-green-400";
      case "Good":
        return "bg-blue-400";
      case "Neutral":
        return "bg-teal-400";
      case "Bad":
        return "bg-yellow-400";
      case "Awful":
        return "bg-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Mood Tracking</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {moods.map((mood, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-2 h-16 ${getMoodClass(
                mood.level
              )} rounded-md relative`}
            >
              <span
                className={`absolute w-4 h-4 rounded-full border border-white -top-2 left-1/2 transform -translate-x-1/2 ${getMoodClass(
                  mood.level
                )}`}
              ></span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-rows-5 text-sm">
        {moodLevels.map((level, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{level}</span>
            <div
              className={`w-2 h-2 rounded-full ${getMoodClass(level)}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxTracker;
