// import React, { useState } from "react";
// import "./Sidebar.css";
// import logo from "../../assets/flamingo-logo.png";
// import Home from "../../assets/Home.png";
// import Salary from "../../assets/Salary.png";
// import Leave from "../../assets/Leave.png";
// import Attendance from "../../assets/Attendance.png";
// import Expenses from "../../assets/Expenses.png";
// import MyProfile from "../../assets/MyProfile.png";
// import ITComputation from "../../assets/ITComputation.png";
// import LogoutIcon from "../../assets/Logout.png";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState("");
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? "" : menu);
//   };

//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   // ✅ Helper function to check if any submenu route is active
//   const isTeamsRouteActive = () => {
//     return location.pathname === "/dashboard/reg-req" || 
//            location.pathname === "/dashboard/team's-leave-request";
//   };

//   const isAttendanceRouteActive = () => {
//     return location.pathname === "/dashboard/attendance" || 
//            location.pathname === "/dashboard/regulrise-status";
//   };

//   const isLeaveRouteActive = () => {
//     return location.pathname === "/dashboard/myleave" || 
//            location.pathname === "/dashboard/leaverequest";
//   };

//   return (
//     <>
//       {/* Mobile Header */}
//       <div className="mobile-header">
//         <img src={logo} alt="Logo" className="mobile-logo" />
//         <button
//           className="hamburger-btn"
//           onClick={() => setSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <div className="logo">
//           <img src={logo} alt="Flamingo Infinite Logo" />
//         </div>

//         <div className="slidebar-all-links">
//           <ul className="nav-links">
//             <NavLink
//               to="/dashboard"
//               end
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={closeSidebar}
//             >
//               <li>
//                 <div className="icon-sildebar">
//                   <img src={Home} alt="home" />
//                   <span className="menu-label">Home</span>
//                 </div>
//               </li>
//             </NavLink>

//             <NavLink
//               to="/dashboard/profile"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={closeSidebar}
//             >
//               <li>
//                 <div className="icon-sildebar">
//                   <img src={MyProfile} alt="profile" />
//                   <span className="menu-label">My Profile</span>
//                 </div>
//               </li>
//             </NavLink>

//             {/* ✅ FIXED: Attendance dropdown with active state check */}
//             <li
//               onClick={() => toggleDropdown("attendance")}
//               className={`${openDropdown === "attendance" ? "dropdown-open" : ""} ${isAttendanceRouteActive() ? "dropdown-active" : ""}`}
//             >
//               <div className="icon-sildebar">
//                 <img src={Attendance} alt="attendance" />
//                 <span className="menu-label">Attendance</span>
//               </div>
//               {openDropdown === "attendance" && (
//                 <ul className="submenu">
//                   <NavLink
//                     to="/dashboard/attendance"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>My Attendance</li>
//                   </NavLink>
//                   <NavLink
//                     to="/dashboard/regulrise-status"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>Regularise</li>
//                   </NavLink>
//                 </ul>
//               )}
//             </li>

//             {/* ✅ FIXED: Leave dropdown with active state check */}
//             <li
//               onClick={() => toggleDropdown("leave")}
//               className={`${openDropdown === "leave" ? "dropdown-open" : ""} ${isLeaveRouteActive() ? "dropdown-active" : ""}`}
//             >
//               <div className="icon-sildebar">
//                 <img src={Leave} alt="leave" />
//                 <span className="menu-label">Leave</span>
//               </div>
//               {openDropdown === "leave" && (
//                 <ul className="submenu">
//                   <NavLink
//                     to="/dashboard/myleave"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>My Leave</li>
//                   </NavLink>
//                   <NavLink
//                     to="/dashboard/leaverequest"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>Leave Request</li>
//                   </NavLink>
//                 </ul>
//               )}
//             </li>

//             {/* ✅ FIXED: Teams dropdown with active state check */}
//             <li
//               onClick={() => toggleDropdown("teams")}
//               className={`${openDropdown === "teams" ? "dropdown-open" : ""} ${isTeamsRouteActive() ? "dropdown-active" : ""}`}
//             >
//               <div className="icon-sildebar">
//                 <img src={Leave} alt="leave" />
//                 <span className="menu-label">Team's requests</span>
//               </div>
//               {openDropdown === "teams" && (
//                 <ul className="submenu">
//                   <NavLink
//                     to="/dashboard/reg-req"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>Regularise</li>
//                   </NavLink>
//                   <NavLink
//                     to="/dashboard/team's-leave-request"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                     onClick={closeSidebar}
//                   >
//                     <li>Leave</li>
//                   </NavLink>
//                 </ul>
//               )}
//             </li>

//             <NavLink
//               to="/dashboard/salary"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={closeSidebar}
//             >
//               <li>
//                 <div className="icon-sildebar">
//                   <img src={Salary} alt="Salary" />
//                   <span className="menu-label">Salary</span>
//                 </div>
//               </li>
//             </NavLink>

//             <NavLink
//               to="/dashboard/it"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={closeSidebar}
//             >
//               <li>
//                 <div className="icon-sildebar">
//                   <img src={ITComputation} alt="IT" />
//                   <span className="menu-label">IT Computation</span>
//                 </div>
//               </li>
//             </NavLink>
//           </ul>
//         </div>

//         {/* Logout Button */}
//         <div className="logout-slidebar" onClick={handleLogout}>
//           <div className="icon-sildebar">
//             <img src={LogoutIcon} alt="logout" />
//             <span className="menu-label">Logout</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assets/flamingo-logo.png";
import Home from "../../assets/Home.png";
import Salary from "../../assets/Salary.png";
import Leave from "../../assets/Leave.png";
import Attendance from "../../assets/Attendance.png";
import Expenses from "../../assets/Expenses.png";
import MyProfile from "../../assets/MyProfile.png";
import ITComputation from "../../assets/ITComputation.png";
import LogoutIcon from "../../assets/Logout.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// Constants for dropdowns
const DROPDOWN_MENU = {
  PROFILE: "profile",
  ATTENDANCE: "attendance",
  LEAVE: "leave",
  TEAMS: "teams"
};

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  // Helper function to check if any submenu route is active
  const isTeamsRouteActive = () => {
    return location.pathname === "/dashboard/reg-req" || 
           location.pathname === "/dashboard/team's-leave-request";
  };

  const isAttendanceRouteActive = () => {
    return location.pathname === "/dashboard/attendance" || 
           location.pathname === "/dashboard/regulrise-status";
  };

  const isLeaveRouteActive = () => {
    return location.pathname === "/dashboard/myleave" || 
           location.pathname === "/dashboard/leaverequest";
  };

  const isProfileRouteActive = () => {
    const profileRoutes = [
      "/dashboard/profile",
      "/dashboard/profile/overview",
      "/dashboard/profile/joining",
      "/dashboard/profile/address-contacts",
      // "/dashboard/profile/attendance-leaves",
      "/dashboard/profile/salary",
      "/dashboard/profile/personal",
      "/dashboard/profile/profile-info",
      "/dashboard/profile/exit",
      "/dashboard/profile/connections"
    ];
    return profileRoutes.includes(location.pathname);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <img src={logo} alt="Logo" className="mobile-logo" />
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Flamingo Infinite Logo" />
        </div>

        <div className="slidebar-all-links">
          <ul className="nav-links">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeSidebar}
            >
              <li>
                <div className="icon-sildebar">
                  <img src={Home} alt="home" />
                  <span className="menu-label">Home</span>
                </div>
              </li>
            </NavLink>

            {/* Profile dropdown with active state check */}
            <li
              onClick={() => toggleDropdown(DROPDOWN_MENU.PROFILE)}
              className={`${openDropdown === DROPDOWN_MENU.PROFILE ? "dropdown-open" : ""} ${isProfileRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={MyProfile} alt="profile" />
                <span className="menu-label">My Profile</span>
              </div>
              {openDropdown === DROPDOWN_MENU.PROFILE && (
                <ul className="submenu">
                  <NavLink to="/dashboard/profile/overview" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Overview</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/joining" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Joining</li>
                  </NavLink>
                  {/* Add more profile links similarly */}
                </ul>
              )}
            </li>

            {/* Attendance dropdown with active state check */}
            <li
              onClick={() => toggleDropdown(DROPDOWN_MENU.ATTENDANCE)}
              className={`${openDropdown === DROPDOWN_MENU.ATTENDANCE ? "dropdown-open" : ""} ${isAttendanceRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Attendance} alt="attendance" />
                <span className="menu-label">Attendance</span>
              </div>
              {openDropdown === DROPDOWN_MENU.ATTENDANCE && (
                <ul className="submenu">
                  <NavLink
                    to="/dashboard/attendance"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>My Attendance</li>
                  </NavLink>
                  <NavLink
                    to="/dashboard/regulrise-status"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Regularisation Status</li>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* Leave dropdown with active state check */}
            <li
              onClick={() => toggleDropdown(DROPDOWN_MENU.LEAVE)}
              className={`${openDropdown === DROPDOWN_MENU.LEAVE ? "dropdown-open" : ""} ${isLeaveRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Leave} alt="leave" />
                <span className="menu-label">Leave</span>
              </div>
              {openDropdown === DROPDOWN_MENU.LEAVE && (
                <ul className="submenu">
                  <NavLink
                    to="/dashboard/myleave"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>My Leave</li>
                  </NavLink>
                  <NavLink
                    to="/dashboard/leaverequest"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Leave Request</li>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* Team's Leave dropdown */}
            <li
              onClick={() => toggleDropdown(DROPDOWN_MENU.TEAMS)}
              className={`${openDropdown === DROPDOWN_MENU.TEAMS ? "dropdown-open" : ""} ${isTeamsRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Expenses} alt="expenses" />
                <span className="menu-label">Team Leave</span>
              </div>
              {openDropdown === DROPDOWN_MENU.TEAMS && (
                <ul className="submenu">
                  <NavLink
                    to="/dashboard/reg-req"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Leave Request</li>
                  </NavLink>
                  <NavLink
                    to="/dashboard/team's-leave-request"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Leave Request Approval</li>
                  </NavLink>
                </ul>
              )}
            </li>

            <li>
              <div className="icon-sildebar" onClick={handleLogout}>
                <img src={LogoutIcon} alt="logout" />
                <span className="menu-label">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
