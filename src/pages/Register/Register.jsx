import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import Term from "../../components/molecules/Term";

const Register = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleAcceptTerms = async () => {
    // If terms are accepted, proceed with the registration request
    setTermsAccepted(true);

    // Request Register
    const response = await fetch(
      "https://admin.aikenhealth.id/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Email
          username: username, // Username
          gender: gender, // Gender
          phone: phone, // Phone number
          password: password, // Password
          premiumAccount: false,
          status: "user",
        }),
      }
    );

    const data = await response.json();

    if (data.jwt) {
      // Save JWT token and user data
      signIn({
        token: data.jwt,
        expiresIn: 3600, // token valid for 1 hour
        tokenType: "Bearer",
        authState: data.user,
      });

      // Redirect to home after successful registration
      navigate("/");
    } else {
      console.error("Register failed", data);
    }
  };

  return (
    <>
      {show ? (
        <Term onAccept={handleAcceptTerms} />
      ) : (
        <div className="h-screen">
          <img src="/ornaments/blurTop.png" alt="blurTop" />
          <div className="flex px-[21px] mt-[-280px] w-full ">
            <div className="w-[16px] h-[650px] bg-gradient-to-b from-[#240F41]  to-[#FFFFFF]" />
            <form onSubmit={handleRegister} className="flex flex-col w-full">
              <div className="flex flex-row items-center justify-center gap-[8px] pt-[63px] w-full ">
                <img
                  src="/icons/logo.png"
                  alt="logo"
                  className="w-auto h-[58px]  "
                />
                <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[24px]">
                  AIKEN.id
                </h1>
              </div>

              {/* Email Input */}
              <div className="flex flex-col pl-[35px] mt-[48px] w-full  ">
                <h1 className="font-medium text-[16px] ">Email Address</h1>
                <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center px-[17px] py-[16px] gap-[16px] mt-[17px] ">
                  <i className="bx bxs-envelope text-[20px] text-[#7A54B7] "></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black"
                    placeholder="Your Email Address"
                    required
                  />
                </div>
              </div>

              {/* Username Input */}
              <div className="flex flex-col pl-[35px] mt-[20px] w-full  ">
                <h1 className="font-medium text-[16px] ">Username</h1>
                <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center px-[17px] py-[16px] gap-[16px] mt-[17px] ">
                  <i className="bx bxs-user text-[20px] text-[#7A54B7] "></i>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black"
                    placeholder="Your Username"
                    required
                  />
                </div>
              </div>

              {/* Gender Input */}
              <div className="flex flex-col pl-[35px] mt-[20px] w-full">
                <h1 className="font-medium text-[16px]">Gender</h1>
                <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center px-[17px] py-[16px] gap-[16px] mt-[17px]">
                  <i className="bx bx-male-female text-[#7A54B7] text-[20px]"></i>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                    className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {/* Phone Input */}
              <div className="flex flex-col pl-[35px] mt-[20px] w-full">
                <h1 className="font-medium text-[16px]">Handphone Number</h1>
                <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center justify-center px-[17px] py-[16px] gap-[16px] mt-[17px]">
                  <i className="bx bxs-phone-call text-[#7A54B7] text-[20px]"></i>
                  <input
                    type="text"
                    value={phone.startsWith("+62") ? phone : `+62${phone}`}
                    onChange={(e) => {
                      // Only allow input after +62 and ensure no space is added between +62 and the number
                      const input = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
                      setPhone(`+62${input.slice(2)}`); // Ensure +62 is at the start
                    }}
                    className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black"
                    placeholder="Your Number"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col pl-[35px] mt-[20px] w-full mb-[30px] ">
                <h1 className="font-medium text-[16px] ">Password</h1>
                <div className="bg-[#E1E1E1] rounded-[23px] w-full flex items-center justify-center px-[17px] py-[16px] gap-[16px] mt-[17px] ">
                  <i className="bx bxs-lock-alt text-[#7A54B7] text-[20px] "></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#E1E1E1] text-[16px] placeholder-[#676767] text-black"
                    placeholder="Your Password"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col pl-[35px] ">
                <button
                  type="submit"
                  className={`py-[11px] w-[171px] rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[16px] `}
                >
                  Sign Up
                </button>
                <NavLink to="/login">
                  <h1 className=" text-[16px] font-bold mt-[26px] ">
                    Do You Have Aiken Account ?{" "}
                    <span className=" text-[#7A54B7] ">Sign In</span>
                  </h1>
                </NavLink>
              </div>
            </form>
          </div>
          <div className="flex justify-end mt-[-20px]">
            <img
              src="/ornaments/blurBottom.png"
              alt="blurBottom"
              className="w-auto h-[200px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
