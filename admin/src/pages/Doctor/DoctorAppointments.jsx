import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function DoctorAppointments() {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currrency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  console.log("Token:", dToken);
  console.log("Appointments:", appointments);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-4 text-xl font-semibold text-gray-700">
        All Appointments
      </p>

      <div className="bg-white border rounded-lg text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto shadow-sm">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_2fr_1fr] gap-2 py-4 px-6 border-b bg-gray-50 font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base 
            sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_2fr_1fr] gap-2 
            items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition"
          >
            <p className="max-sm:hidden font-medium">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-9 h-9 rounded-full object-cover"
                src={item.userData.image}
                alt=""
              />
              <p className="font-medium text-gray-700">{item.userData.name}</p>
            </div>

            <div>
              <p
                className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${
                  item.payment
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p className="font-medium text-gray-700">
              {currrency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400  font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 font-medium ">Completed</p>
            ) : (
              <div className="flex gap-2">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:scale-110 transition"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-8 cursor-pointer hover:scale-110 transition"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;
