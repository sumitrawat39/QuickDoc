import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-300 bg-white">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <img
          className="w-17 h-15  cursor-pointer hover:opacity-80 transition"
          src={assets.QuickDocLogo}
          alt="QuickDoc Logo"
        />
        <span className="text-xs sm:text-sm font-medium border px-3 py-1 rounded-full border-gray-400 text-gray-600 bg-gray-50">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* Right Section */}
      <button
        onClick={logout}
        className="bg-[#5f6fff] hover:bg-[#4b5dfc] transition text-white text-sm px-8 py-2 rounded-full shadow-md"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
