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
  ); // Ambil bulan yang dipilih
  const [selectedWeek, setSelectedWeek] = useState(1); // Pekan yang dipilih, default pekan 1
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    // Fungsi untuk memperbarui bulan jika ada perubahan di localStorage
    const checkMonthChange = () => {
      const currentMonth = localStorage.getItem("selectedMonth");
      if (currentMonth !== selectedMonth) {
        setSelectedMonth(currentMonth); // Update state jika bulan berubah
      }
    };

    // Set interval untuk memantau perubahan bulan setiap detik
    const interval = setInterval(checkMonthChange, 1000); // Cek setiap 1 detik

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [selectedMonth]);

  // Filter data berdasarkan bulan yang dipilih
  const monthFilteredData = filteredData.filter((item) => {
    const itemMonth = new Date(item.attributes.publishedAt)
      .toISOString()
      .slice(0, 7); // Ambil tahun-bulan
    return itemMonth === selectedMonth; // Cocokkan dengan bulan yang dipilih
  });

  // Filter data berdasarkan pekan yang dipilih
  const weekFilteredData = monthFilteredData.filter((item) => {
    const day = new Date(item.attributes.publishedAt).getDate();
    const startDay = (selectedWeek - 1) * 7 + 1;
    const endDay = startDay + 6;
    return day >= startDay && day <= endDay;
  });

  useEffect(() => {
    // Preload icons
    Object.keys(moodIcons).forEach((mood) => {
      const img = new Image();
      img.src = moodIcons[mood];
      img.onload = () => {
        setImageMap((prev) => ({ ...prev, [mood]: img }));
      };
    });
  }, []);

  // Map data yang sesuai pekan yang dipilih
  const moodData = weekFilteredData.map((item) => {
    const date = new Date(item.attributes.publishedAt).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    const mood = item.attributes.title.toLowerCase();
    return {
      x: date, // hari
      y: moodScale[mood], // nilai mood
      mood, // mood untuk icon
    };
  });

  // Hari yang harus selalu muncul pada sumbu X
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data = {
    datasets: [
      {
        label: "Mood Tracking",
        data: moodData,
        pointStyle: (context) => imageMap[context.raw.mood],
        pointRadius: (context) => {
          const value = context.raw.y;
          if (value === 5) return 25; // happy
          if (value === 4) return 20; // fear
          if (value === 3) return 15; // disgust
          if (value === 2) return 10; // sad
          return 8; // angry
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
        labels: daysOfWeek, // Semua hari selalu ditampilkan
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const moodLabels = [
              "Angry",
              "Sad",
              "Disgust",
              "Fear",
              "Happy",
              "Surprise",
            ];
            return moodLabels[value - 1] || "";
          },
        },
        title: {
          display: true,
          text: "Mood",
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
              "Angry",
              "Sad",
              "Disgust",
              "Fear",
              "Happy",
              "Surprise",
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
        <label htmlFor="week-select">Select Week: </label>
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

      {/* Tampilkan pesan "not found" jika tidak ada data */}
      {moodData.length === 0 ? (
        <div className="text-black mt-8 font-semibold text-center">
          Data not found for {selectedMonth}, Week {selectedWeek}
        </div>
      ) : (
        <Scatter data={data} options={options} />
      )}
    </div>
  );
};

export default ScatterChart;
