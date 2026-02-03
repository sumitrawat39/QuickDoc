import React, { useState } from "react";
import { assets } from "../assets/assets";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "edward@gmail.com",
    phone: "+91 1234567899",
    address: {
      line1: "XYZ",
      line2: "INDIA",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 text-sm">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          className="rounded-full w-36 h-36 object-cover border"
          src={userData.image}
          alt=""
        />
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium mt-4 px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-center text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-300 h-px border-none my-2" />

      {/* Contact Info */}
      <div>
        <p className="text-neutral-500 font-semibold underline tracking-wide">
          CONTACT INFORMATION
        </p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-4 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500 break-all">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded-md border focus:outline-none"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-100 px-2 py-1 rounded-md border"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-100 px-2 py-1 rounded-md border"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-neutral-500 font-semibold underline tracking-wide mt-4">
          BASIC INFORMATION
        </p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-4 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 rounded-md border max-w-28"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded-md border max-w-36"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
