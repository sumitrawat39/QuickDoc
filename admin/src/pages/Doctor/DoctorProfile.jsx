import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorProfile() {
  const { dToken, getProfileData, profileData, setProfileData, backendUrl } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    profileData && (
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-6">
          <div className="flex justify-center md:justify-start">
            <img
              className="w-56 h-56 object-cover rounded-xl bg-[#5f6fff]/80"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              {profileData.name}
            </h2>

            <div className="flex items-center gap-3 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="px-3 py-1 text-xs border rounded-full">
                {profileData.experience}
              </span>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-1">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-700">
                Appointment Fee:
                <span className="ml-2 text-gray-800 font-semibold">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-1">Address</h3>
              <p className="text-gray-600">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
              </p>
              <p className="text-gray-600">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                className="w-4 h-4 accent-[#5f6fff] cursor-pointer"
              />
              <label className="text-gray-700">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="bg-[#5f6fff] text-white px-6 py-2 rounded-full hover:opacity-80 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-[#5f6fff] text-white px-6 py-2 rounded-full hover:opacity-80 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorProfile;
