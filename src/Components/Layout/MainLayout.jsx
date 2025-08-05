import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HomeDashboard from "../Home/HomeDashboard";
import Attendance from "../Attendance/Attendance";
import { Routes, Route } from "react-router-dom";
import "./MainLayout.css";
import RegulariseForm from "../Attendance/RegulariseRequest/RegulariseForm";
import LeaveRequest from "../Leave/LeaveRequest";
import Expanses from "../Expanses/Expanses";
import Profile from "../Profile/Profile";
import ITComputation from "../ITComputation/ITComputation";
import Salary from "../Salary/Salary";
import MyLeave from "../Leave/MyLeave";
import HolidayPage from "../Leave/Holidays/HolidayPage";

// Dummy pages (replace with real ones)
// const MyProfile = () => <div>My Profile</div>;
// const Leave = () => <div>Leave</div>;
// const Salary = () => <div>Salary</div>;
// const ITComputation = () => <div>IT Computation</div>;
// const Expenses = () => <div>Expenses</div>;

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/regularise" element={<RegulariseForm />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaverequest" element={<LeaveRequest />} />
          <Route path="/myleave" element={<MyLeave />} />
          <Route path="/holiday-list" element={<HolidayPage/>}/>
          <Route path="/salary" element={<Salary />} />
          <Route path="/it" element={<ITComputation />} />
          <Route path="/expenses" element={<Expanses />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
