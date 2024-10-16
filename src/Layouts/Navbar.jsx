import React, { useEffect, useState } from "react";
import { navigationLinks } from "./NavbarList";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const signOut = useSignOut();
  const { t } = useTranslation();
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
      case "/mood-assesment":
        setActiveIndex(2);
        break;
      case "/reading-corner":
        setActiveIndex(2);
        break;
      case "/dear-diary":
        setActiveIndex(2);
        break;
      case "/public-diary":
        setActiveIndex(2);
        break;
      case "/psikiater":
        setActiveIndex(2);
        break;
      case "/chat-doctor":
        setActiveIndex(2);
        break;
      case "/psikiater-profile":
        setActiveIndex(2);
        break;
      case "/chat-ai":
        setActiveIndex(2);
        break;
      case "/payment":
        setActiveIndex(2);
        break;
      case "/payment-rules":
        setActiveIndex(2);
        break;
      case "/payment-card":
        setActiveIndex(2);
        break;
      case "/profile":
        setActiveIndex(3);
        break;
      case "/ar-scan":
        setActiveIndex(0);
        break;
      case "/mood-tracker":
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
                  <li className={`list ${activeIndex === 0 ? "active" : ""}`}>
                    <a href="https://aikenar.netlify.app/">
                      <span className="icon">
                        <ion-icon name="scan-outline"></ion-icon>
                      </span>
                      <span className="text">{t("AR")}</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </div>
                <NavLink to="/mood-tracker">
                  <li className={`list ${activeIndex === 1 ? "active  " : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="bar-chart-outline"></ion-icon>
                      </span>
                      <span className="text">{t("mood")}</span>
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
                      <span className="text">{t("home")}</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/profile">
                  <li className={`list ${activeIndex === 3 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="person-outline"></ion-icon>
                      </span>
                      <span className="text">{t("profile")}</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <li
                  onClick={handleSignOut}
                  className={`list ${activeIndex === 4 ? "active " : ""}`}
                >
                  <a>
                    <span className="icon">
                      <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="text">Logout</span>
                    <span className="circle"></span>
                  </a>
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
