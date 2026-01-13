import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function MyAppointment() {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-lg">
        My Appointments
      </p>

      <div className="mt-6 flex flex-col gap-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-6 p-4 border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Doctor Image */}
            <div className="shrink-0">
              <img
                className="w-32 h-32 object-cover rounded-lg bg-indigo-50"
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold text-base">
                {item.name}
              </p>
              <p className="text-sm">{item.speciality}</p>

              <p className="text-zinc-700 font-medium mt-2">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>

              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                25, July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 justify-end sm:min-w-[180px]">
              <button className="text-sm py-2 border rounded-lg text-stone-600 hover:bg-[#5f6fff] hover:text-white transition-all">
                Pay Online
              </button>
              <button className="text-sm py-2 border rounded-lg text-stone-600 hover:bg-red-600 hover:text-white transition-all">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;
