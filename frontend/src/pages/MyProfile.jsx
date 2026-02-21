import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block cursor-pointer relative">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? null : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <div className="flex justify-center">
            <img
              className="rounded-full w-36 h-36 object-cover border"
              src={userData.image}
              alt=""
            />
          </div>
        )}

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

        <div className="mt-8 flex justify-center">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all"
              onClick={updateUserProfileData}
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
    )
  );
}

export default MyProfile;
