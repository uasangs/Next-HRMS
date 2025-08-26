import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HomeDashboard from "../Home/HomeDashboard";
import Attendance from "../Attendance/Attendance";
import { Routes, Route } from "react-router-dom";
import "./MainLayout.css";
import RegulariseForm from "../Attendance/RegulariseRequest/RegulariseForm";
import LeaveRequest from "../Leave/LeaveRequest";
import Expanses from "../Expanses/Expanses";
import Profile from "../Profile/ProfileOverview";
import ITComputation from "../ITComputation/ITComputation";
import Salary from "../Salary/Salary";
import MyLeave from "../Leave/MyLeave";
import HolidayPage from "../Leave/Holidays/HolidayPage";
import StatusTabs from "../Attendance/RegulariseRequest/StatusTab";
import RegularisseRequest from "../TeamsRequest/Regularise//RegularisseRequest";
import TeamLeavereq from "../TeamsRequest/Leave/TeamLeavereq";
import ProfileOverview from '../Profile/ProfileOverview';
import ProfileJoining from '../Profile/ProfileJoining';
import ProfileAddress from '../Profile/ProfileAddress';
import ProfileAttendance from '../Profile/ProfileAttendance';
import ProfileSalary from '../Profile/ProfileSalary';
import ProfilePersonal from '../Profile/ProfilePersonal';
import ProfileInfo from '../Profile/ProfileInfo';
import ProfileExit from '../Profile/ProfileExit';
import ProfileConnections from '../Profile/ProfileConnections';



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
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/profile/:tab" element={<Profile />} />
  
          <Route path="/dashboard/profile/overview" element={<ProfileOverview />} />
          <Route path="/dashboard/profile/joining" element={<ProfileJoining />} />
          <Route path="/dashboard/profile/address-contacts" element={<ProfileAddress />} />
          <Route path="/dashboard/profile/attendance-leaves" element={<ProfileAttendance />} />
          <Route path="/dashboard/profile/salary" element={<ProfileSalary />} />
          <Route path="/dashboard/profile/personal" element={<ProfilePersonal />} />
          <Route path="/dashboard/profile/profile-info" element={<ProfileInfo />} />
          <Route path="/dashboard/profile/exit" element={<ProfileExit />} />
          <Route path="/dashboard/profile/connections" element={<ProfileConnections />} />

        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
