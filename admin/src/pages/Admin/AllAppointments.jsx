import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function AllAppointments() {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <p className="mb-6 text-2xl font-semibold text-gray-800">
        All Appointments
      </p>

      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <div
          className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] 
      bg-gray-50 text-gray-700 font-medium text-sm py-4 px-6 border-b"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className="text-center">Actions</p>
        </div>

        <div className="max-h-[75vh] overflow-y-auto">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] 
          items-center gap-4 py-4 px-6 border-b 
          text-gray-600 text-sm hover:bg-indigo-50 transition-all duration-200"
            >
              <p className="max-sm:hidden font-medium text-gray-500">
                {index + 1}
              </p>

              <div className="flex items-center gap-3">
                <img
                  className="w-9 h-9 rounded-full object-cover border"
                  src={item.userData.image}
                  alt=""
                />
                <p className="font-medium text-gray-800">
                  {item.userData.name}
                </p>
              </div>

              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

              <p>
                {slotDateFormat(item.slotDate)},{" "}
                <span className="text-gray-800 font-medium">
                  {item.slotTime}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <img
                  className="w-9 h-9 rounded-full object-cover border bg-gray-100"
                  src={item.docData.image}
                  alt=""
                />
                <p className="font-medium text-gray-800">{item.docData.name}</p>
              </div>

              <p className="font-semibold text-indigo-600">
                {currency}
                {item.amount}
              </p>

              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold text-center bg-red-50 px-3 py-1 rounded-full">
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-semibold text-center bg-red-50 px-3 py-1 rounded-full">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
