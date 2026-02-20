import { useContext, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctors from "./pages/Admin/AddDoctors";
import DoctorsList from "./pages/Admin/DoctorsList";


function App() {
  const { aToken } = useContext(AdminContext);
  console.log("Token:", aToken);

  return (
    <>
      {aToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />{" "}
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>}/>
              <Route path="/admin-dashboard" element={<Dashboard/>}/>
              <Route path="/all-appointments" element={<AllAppointments/>}/>
              <Route path="/add-doctors" element={<AddDoctors/>}/>
              <Route path="/doctor-list" element={<DoctorsList/>}/>
            </Routes>
          </div>{" "}
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
