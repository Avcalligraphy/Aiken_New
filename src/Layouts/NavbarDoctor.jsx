import React, { useEffect, useState } from "react";
import { navigationLinks } from "./NavbarList";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

export default function NavbarDoctor() {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(); // Menghapus token dan user dari local storage
    navigate("/landing"); // Redirect ke halaman login setelah sign out
  };
  // Update activeIndex based on pathname
  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveIndex(2);
        break;
      case "/pasien-diary":
        setActiveIndex(2);
        break;
      case "/mood-pasien":
        setActiveIndex(2);
        break;
      case "":
        setActiveIndex(3);
        break;
      case "#":
        setActiveIndex(0);
        break;
      case "/profile":
        setActiveIndex(1);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [pathname]);

  return (
    <>
      {pathname === "/landing-page" ||
      pathname === "/register" ||
      pathname === "/login" ? null : (
        <div className="containerNavbar">
          <div className="containerNavbarBottom">
            <div className="navigation shadow-md shadow-[#240F41]">
              <ul>
                <div>
                  <li
                    className={`list ${activeIndex === 0 ? "active" : ""}`}
                  ></li>
                </div>
                <NavLink to="/profile">
                  <li className={`list ${activeIndex === 1 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="person-outline"></ion-icon>
                      </span>
                      <span className="text">Profile</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/">
                  <li className={`list ${activeIndex === 2 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                      </span>
                      <span className="text">Home</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <li
                  onClick={handleSignOut}
                  className={`list ${activeIndex === 3 ? "active " : ""}`}
                >
                  <a>
                    <span className="icon">
                      <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="text">Logout</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <li
                  className={`list ${activeIndex === 4 ? "active " : ""}`}
                >
       
                </li>
                <div
                  className="indicator"
                  style={{
                    transform: `translateX(calc(70px * ${activeIndex}))`,
                    transition: "transform 0.3s ease",
                  }}
                ></div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
