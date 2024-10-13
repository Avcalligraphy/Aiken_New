import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";

Chart.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const moodScale = {
  happy: 5,
  angry: 1,
  sad: 2,
  disgust: 3,
  fear: 4,
  surprise: 6,
};

const moodIcons = {
  happy: "/icons/happyIcon.png",
  angry: "/icons/angryIcon.png",
  sad: "/icons/sadIcon.png",
  disgust: "/icons/disgustIcon.png",
  fear: "/icons/fearIcon.png",
  surprise: "/icons/surpriseIcon.png",
};

const ScatterChart = ({ filteredData }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth")
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [imageMap, setImageMap] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const checkMonthChange = () => {
      const currentMonth = localStorage.getItem("selectedMonth");
      if (currentMonth !== selectedMonth) {
        setSelectedMonth(currentMonth);
      }
    };

    const interval = setInterval(checkMonthChange, 1000);

    return () => clearInterval(interval);
  }, [selectedMonth]);

  const monthFilteredData = filteredData.filter((item) => {
    const itemMonth = new Date(item.attributes.publishedAt)
      .toISOString()
      .slice(0, 7);
    return itemMonth === selectedMonth;
  });

  const weekFilteredData = monthFilteredData.filter((item) => {
    const day = new Date(item.attributes.publishedAt).getDate();
    const startDay = (selectedWeek - 1) * 7 + 1;
    const endDay = startDay + 6;
    return day >= startDay && day <= endDay;
  });

  useEffect(() => {
    Object.keys(moodIcons).forEach((mood) => {
      const img = new Image();
      img.src = moodIcons[mood];
      img.onload = () => {
        setImageMap((prev) => ({ ...prev, [mood]: img }));
      };
    });
  }, []);

  const moodData = weekFilteredData.map((item) => {
    const date = new Date(item.attributes.publishedAt).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    const mood = item.attributes.title.toLowerCase();
    return {
      x: t(`days_of_week.${date.toLowerCase()}`), // Terjemahan untuk hari
      y: moodScale[mood],
      mood,
    };
  });

  const daysOfWeek = [
    t("days_of_week.sunday"),
    t("days_of_week.monday"),
    t("days_of_week.tuesday"),
    t("days_of_week.wednesday"),
    t("days_of_week.thursday"),
    t("days_of_week.friday"),
    t("days_of_week.saturday"),
  ];

  const data = {
    datasets: [
      {
        label: "Mood Tracking",
        data: moodData,
        pointStyle: (context) => imageMap[context.raw.mood],
        pointRadius: (context) => {
          const value = context.raw.y;
          if (value === 5) return 25;
          if (value === 4) return 20;
          if (value === 3) return 15;
          if (value === 2) return 10;
          return 8;
        },
        pointHoverRadius: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: daysOfWeek, // Terjemahan untuk hari
        title: {
          display: true,
          text: t("day"),
        },
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const moodLabels = [
              t("emotions.angry"),
              t("emotions.sad"),
              t("emotions.disgust"),
              t("emotions.fear"),
              t("emotions.happy"),
              t("emotions.surprise"),
            ];
            return moodLabels[value - 1] || "";
          },
        },
        title: {
          display: true,
          text: t("mood"),
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const moodLabels = [
              t("emotions.angry"),
              t("emotions.sad"),
              t("emotions.disgust"),
              t("emotions.fear"),
              t("emotions.happy"),
              t("emotions.surprise"),
            ];
            const day = context.label;
            const mood = moodLabels[Math.round(context.raw.y) - 1];
            return `${day}: ${mood}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <div>
        <label htmlFor="week-select">{t("weekLabel")}: </label>
        <select
          id="week-select"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
        >
          <option value={1}>Week 1 (1-7)</option>
          <option value={2}>Week 2 (8-14)</option>
          <option value={3}>Week 3 (15-21)</option>
          <option value={4}>Week 4 (22-28)</option>
          <option value={5}>Week 5 (29-31)</option>
        </select>
      </div>

      {moodData.length === 0 ? (
        <div className="text-black mt-8 font-semibold text-center">
          {t("entri")} {selectedMonth}, Week {selectedWeek}
        </div>
      ) : (
        <Scatter data={data} options={options} />
      )}
    </div>
  );
};

export default ScatterChart;
