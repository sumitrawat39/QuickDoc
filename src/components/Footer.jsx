import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 ">
      <div className="md:mx-10 px-6 py-7 ">
        <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
          {/* Left Section */}
          <div>
            <img
              className="mb-5 w-40"
              src={assets.QuickDocLogo}
              alt="QuickDoc Logo"
            />
            <p className="md:w-2/3 text-gray-600 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              aspernatur provident maiores vel. Quidem, perspiciatis.
            </p>
          </div>

          {/* Center Section */}
          <div>
            <p className="text-xl font-medium mb-5 text-gray-800">COMPANY</p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <Link
                onClick={() => {
                  navigate("/");
                  scrollTo(0, 0);
                }}
              >
                <li className="hover:text-primary cursor-pointer transition">
                  Home
                </li>
              </Link>
              <li className="hover:text-primary cursor-pointer transition">
                About us
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Contact us
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-xl font-medium mb-5 text-gray-800">
              Get In Touch
            </p>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-primary transition cursor-pointer">
                +91 9939023903
              </li>
              <li className="hover:text-primary transition cursor-pointer">
                Sumit@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t mt-14 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} QuickDoc. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
