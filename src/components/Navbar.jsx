import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-300 bg-white">
      <img
        className="w-14 h-14 cursor-pointer"
        src={assets.QuickDocLogo}
        alt="LOGO"
        onClick={() => navigate("/")}
      />

      <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#5f6FFF]" : "hover:text-[#5f6FFF]"
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-[#5f6FFF]" : "hover:text-[#5f6FFF]"
          }
        >
          ALL DOCTORS
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-[#5f6FFF]" : "hover:text-[#5f6FFF]"
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-[#5f6FFF]" : "hover:text-[#5f6FFF]"
          }
        >
          CONTACT
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <img
              className="w-8 h-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />

            <div className="absolute top-0 right-0 pt-9 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-45 bg-stone-100 rounded-xl flex flex-col gap-0 p-1">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="px-4 py-1 hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointment")}
                  className="px-4 py-1  hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="px-4 py-1  cursor-pointer text-red-400 hover:text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-5 py-2 rounded-full text-sm"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
