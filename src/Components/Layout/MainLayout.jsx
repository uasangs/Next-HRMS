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
import StatusTabs from "../Attendance/RegulariseRequest/StatusTab";
import RegularisseRequest from "../TeamsRequest/Regularise//RegularisseRequest";
import TeamLeavereq from "../TeamsRequest/Leave/TeamLeavereq";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index element={<HomeDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="regularise" element={<RegulariseForm />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaverequest" element={<LeaveRequest />} />
          <Route path="myleave" element={<MyLeave />} />
          <Route path="holiday-list" element={<HolidayPage />} />
          <Route path="salary" element={<Salary />} />
          <Route path="it" element={<ITComputation />} />
          <Route path="expenses" element={<Expanses />} /> 
          <Route path="reg-req" element={<RegularisseRequest />} /> 
          <Route path="team's-leave-request" element={<TeamLeavereq />} />
          <Route path="regulrise-status" element={<StatusTabs />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
