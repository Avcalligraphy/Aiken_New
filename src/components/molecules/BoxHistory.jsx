import axios from 'axios';
import React from 'react'
import { useAuthHeader } from 'react-auth-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BoxHistory = ({active = true, desc, name, date, onClick, id, doctorPhoto}) => {
  const apiURL = "https://admin.aikenhealth.id";
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const authHeader = useAuthHeader()
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    };
    const deleteDiary = async (id) => {
      const apiURL = `https://admin.aikenhealth.id/api/consultings/${id}`;
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
          navigate('/')
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
    <div className="bg-gradient-to-r from-[#240F41] to-[#7A54B7] p-[1px] rounded-[20px] w-full h-fit shadow-md shadow-[#7A54B7]">
      <div
        className={`${
          active ? "bg-gradient-to-b from-[#321A5C] to-[#150629]" : "bg-white"
        } px-[20px] py-[15px] rounded-[20px]`}
      >
        <div className='flex items-center justify-between'>
          <div className="flex flex-row gap-[6px] items-center ">
            {pathname === '/chat-doctor' ? (<img
              src={ apiURL + doctorPhoto}
              className=" w-[29px] h-[29px] bg-cover rounded-full "
            />) : <img
              src="/images/profile.jpg"
              className=" w-[29px] h-[29px] bg-cover rounded-full "
            />}
            <div className="flex flex-col">
              <h1
                className={`font-semibold text-[10px] ${
                  active ? "text-white" : null
                }`}
              >
                {name}
              </h1>
              <p className=" text-[#757575] text-[8px] font-semibold ">
                {formatDate(date)}
              </p>
            </div>
          </div>
          {pathname === '/chat-doctor' ? null : (<div className="flex flex-row gap-[15px]">
            <i
              onClick={() => deleteDiary(id)}
              className="bx bxs-trash text-[20px] text-[#E21E1E] "
            ></i>
            <i onClick={onClick} className="bx bxs-edit-alt text-[20px] text-amber-400 "></i>
          </div>)}
        </div>
        <h1
          className={`font-medium text-[11px] ${
            active ? "text-white" : null
          } mt-[15px] `}
        >
          {desc}
        </h1>
      </div>
    </div>
  );
}

export default BoxHistory