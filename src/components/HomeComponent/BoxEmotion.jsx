import axios from 'axios';
import React from 'react'
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const BoxEmotion = ({title, dataMood, date, id, data}) => {
  const {t} = useTranslation()
  const jsonObject = JSON.parse(dataMood);
  const authHeader = useAuthHeader();
  const mappedData = Object.entries(jsonObject).map(([key, value]) => ({
    emotion: key,
    isActive: value,
  }));
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Daftar nama hari dan bulan
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Ambil bagian-bagian dari objek Date
    const dayName = days[date.getDay()]; // Nama hari (lokal)
    const day = date.getDate(); // Tanggal (lokal)
    const month = months[date.getMonth()]; // Nama bulan (lokal)
    const hour = date.getHours(); // Jam (lokal)

    // Format string sesuai kebutuhan
    return `${dayName}, ${day} ${month}`;
  }
  function formattedHour(dateString) {
    const date = new Date(dateString);
    const hour = date.getHours(); // Jam (lokal)

    // Format string sesuai kebutuhan
    return `${hour}`;
  }
  const deleteDiary = async (id) => {
    const apiURL = `https://admin.aikenhealth.id/api/moods/${id}`;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#240F41",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(apiURL, {
          headers: {
            Authorization: authHeader(),
          },
        });
        console.log("Data deleted:", response.data);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the file.",
          icon: "error",
        });
      }
    }
  };


  return (
    <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[1px] rounded-[24px] w-full h-fit shadow-md shadow-[#7A54B7] ">
      <div className=" h-fit bg-white px-[15px] py-[10px] rounded-[24px] flex flex-row justify-between ">
        <div className="flex flex-row gap-[12px]">
          <img
            alt="mood-icon"
            src={`/icons/${title}Mood.png`}
            className="w-[60px] h-[60px] bg-cover "
          />
          <div className="flex flex-col">
            <div>
              <h1 className="font-medium text-[14px] ">{formatDate(date)}</h1>
              <h1
                className={`font-semibold text-[18px] ${
                  title === "angry"
                    ? "text-[#9D4760]"
                    : title === "disgust"
                    ? "text-[#4D9217]"
                    : title === "sad"
                    ? "text-[#443CC1]"
                    : title === "happy"
                    ? "text-[#FFC200]"
                    : title === "fear"
                    ? "text-[#7A54B7]"
                    : "text-[#34B5B7]"
                }`}
              >
                {t(`moodList.${title}.name`)}
                <span className=" ml-2 mr-2 font-medium text-[10px] text-black ">
                  {formattedHour(date)}:00
                </span>
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-[4px] mt-2 ">
              {mappedData.map((item) => (
                <div className="flex gap-[4px] items-center">
                  <div
                    className={`h-[8px] w-[8px] rounded-full  ${
                      title === "angry"
                        ? "bg-[#9D4760]"
                        : title === "disgust"
                        ? "bg-[#4D9217]"
                        : title === "sad"
                        ? "bg-[#443CC1]"
                        : title === "happy"
                        ? "bg-[#FFC200]"
                        : title === "fear"
                        ? "bg-[#7A54B7]"
                        : "bg-[#34B5B7]"
                    }`}
                  />
                  <p className="text-[14px] ">
                    {" "}
                    {t(`emotionsMood.${item.emotion}`)}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[12px]">
          <NavLink to="/mood-assesment" state={{ data: data }}>
            <i className="bx bxs-edit-alt text-[20px] text-amber-400 "></i>
          </NavLink>
          <i
            onClick={() => deleteDiary(id)}
            className="bx bxs-trash text-[20px] text-[#E21E1E] "
          ></i>
        </div>
      </div>
    </div>
  );
}

export default BoxEmotion