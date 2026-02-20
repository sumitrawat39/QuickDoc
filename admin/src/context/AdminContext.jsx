import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import DoctorsList from "../pages/Admin/DoctorsList";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } },
      );
      if (data.success) {
        setDoctors(data.doctors);
        // console.log("all doctors", data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } },
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
