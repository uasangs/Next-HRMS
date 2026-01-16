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
 
//   // Helper function to check if any submenu route is active
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
 
// // Add this helper function with your other helper functions:
// const isProfileRouteActive = () => {
//   const profileRoutes = [
//     "/dashboard/profile",
//     "/dashboard/profile/overview",
//     "/dashboard/profile/joining",
//     "/dashboard/profile/address-contacts",
//     "/dashboard/profile/attendance-leaves",
//     "/dashboard/profile/salary",
//     "/dashboard/profile/personal",
//     "/dashboard/profile/profile-info",
//     "/dashboard/profile/exit",
//     "/dashboard/profile/connections"
//   ];
//   return profileRoutes.includes(location.pathname);
// };
 
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
 
//             {/* Updated Profile dropdown */}
       
// <li
//   onClick={() => toggleDropdown("profile")}
//   className={`${openDropdown === "profile" ? "dropdown-open" : ""} ${isProfileRouteActive() ? "dropdown-active" : ""}`}
// >
//   <div className="icon-sildebar">
//     <img src={MyProfile} alt="profile" />
//     <span className="menu-label">My Profile</span>
//   </div>
//   {openDropdown === "profile" && (
//     <ul className="submenu">
//       <NavLink to="/dashboard/profile/overview" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Overview</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/joining" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Joining</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/address-contacts" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Address & Contacts</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/attendance-leaves" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Attendance & Leaves</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/salary" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Salary</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/personal" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Personal</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/profile-info" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Profile</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/exit" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Exit</li>
//       </NavLink>
//       <NavLink to="/dashboard/profile/connections" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
//         <li>Connections</li>
//       </NavLink>
//     </ul>
//   )}
// </li>
 
//             {/* Attendance dropdown with active state check */}
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
 
//             {/* Leave dropdown with active state check */}
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
 
//             {/* Teams dropdown with active state check */}
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
//               to="/dashboard/joboffer"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={closeSidebar}
//             >
//               <li>
//                 <div className="icon-sildebar">
//                   <img src={Salary} alt="Salary" />
//                   <span className="menu-label">Offer letter</span>
//                 </div>
//               </li>
//             </NavLink>
 
//             {/* <NavLink
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
//             </NavLink> */}
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
 
  // Helper functions for active route checking
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
      "/dashboard/profile/attendance-leaves",
      "/dashboard/profile/salary",
      "/dashboard/profile/personal",
      "/dashboard/profile/profile-info",
      "/dashboard/profile/exit",
      "/dashboard/profile/connections"
    ];
    return profileRoutes.includes(location.pathname);
  };

  const isATSRouteActive = () => {
    return location.pathname.startsWith("/dashboard/ats");
  };

  const isOnboardingRouteActive = () => {
    return location.pathname.startsWith("/dashboard/onboarding");
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
            {/* Home */}
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
 
            {/* Profile dropdown */}
            <li
              onClick={() => toggleDropdown("profile")}
              className={`${openDropdown === "profile" ? "dropdown-open" : ""} ${isProfileRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={MyProfile} alt="profile" />
                <span className="menu-label">My Profile</span>
              </div>
              {openDropdown === "profile" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/profile/overview" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Overview</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/joining" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Joining</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/address-contacts" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Address & Contacts</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/attendance-leaves" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Attendance & Leaves</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/salary" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Salary</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/personal" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Personal</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/profile-info" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Profile</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/exit" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Exit</li>
                  </NavLink>
                  <NavLink to="/dashboard/profile/connections" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Connections</li>
                  </NavLink>
                </ul>
              )}
            </li>
 
            {/* Attendance dropdown */}
            <li
              onClick={() => toggleDropdown("attendance")}
              className={`${openDropdown === "attendance" ? "dropdown-open" : ""} ${isAttendanceRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Attendance} alt="attendance" />
                <span className="menu-label">Attendance</span>
              </div>
              {openDropdown === "attendance" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/attendance" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>My Attendance</li>
                  </NavLink>
                  <NavLink to="/dashboard/regulrise-status" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Regularise</li>
                  </NavLink>
                </ul>
              )}
            </li>
 
            {/* Leave dropdown */}
            <li
              onClick={() => toggleDropdown("leave")}
              className={`${openDropdown === "leave" ? "dropdown-open" : ""} ${isLeaveRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Leave} alt="leave" />
                <span className="menu-label">Leave</span>
              </div>
              {openDropdown === "leave" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/myleave" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>My Leave</li>
                  </NavLink>
                  <NavLink to="/dashboard/leaverequest" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Leave Request</li>
                  </NavLink>
                </ul>
              )}
            </li>
 
            {/* Teams dropdown */}
            <li
              onClick={() => toggleDropdown("teams")}
              className={`${openDropdown === "teams" ? "dropdown-open" : ""} ${isTeamsRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={Leave} alt="leave" />
                <span className="menu-label">Team's requests</span>
              </div>
              {openDropdown === "teams" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/reg-req" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Regularise</li>
                  </NavLink>
                  <NavLink to="/dashboard/team's-leave-request" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Leave</li>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* ATS Module Dropdown */}
            <li
              onClick={() => toggleDropdown("ats")}
              className={`${openDropdown === "ats" ? "dropdown-open" : ""} ${isATSRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={MyProfile} alt="ats" />
                <span className="menu-label">ATS</span>
              </div>
              {openDropdown === "ats" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/ats" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Dashboard</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/jobs" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Job Requisitions</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/candidates" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Candidates</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/screening" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Screening</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/interviews" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Interviews</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/offers" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Offers</li>
                  </NavLink>
                  <NavLink to="/dashboard/ats/analytics" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Analytics</li>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* On-boarding Module Dropdown */}
            <li
              onClick={() => toggleDropdown("onboarding")}
              className={`${openDropdown === "onboarding" ? "dropdown-open" : ""} ${isOnboardingRouteActive() ? "dropdown-active" : ""}`}
            >
              <div className="icon-sildebar">
                <img src={MyProfile} alt="onboarding" />
                <span className="menu-label">On-boarding</span>
              </div>
              {openDropdown === "onboarding" && (
                <ul className="submenu">
                  <NavLink to="/dashboard/onboarding" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Dashboard</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/pre-joining" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Pre-Joining</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/joining-form" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Joining Form</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/documents" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Documents</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/system-access" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>System Access</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/probation" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Probation</li>
                  </NavLink>
                  <NavLink to="/dashboard/onboarding/exit" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
                    <li>Exit & Off-boarding</li>
                  </NavLink>
                </ul>
              )}
            </li>
 
            {/* Salary */}
            <NavLink to="/dashboard/salary" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
              <li>
                <div className="icon-sildebar">
                  <img src={Salary} alt="Salary" />
                  <span className="menu-label">Salary</span>
                </div>
              </li>
            </NavLink>

            {/* Offer letter */}
            <NavLink to="/dashboard/joboffer" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeSidebar}>
              <li>
                <div className="icon-sildebar">
                  <img src={Salary} alt="Salary" />
                  <span className="menu-label">Offer letter</span>
                </div>
              </li>
            </NavLink>
          </ul>
        </div>
 
        {/* Logout Button */}
        <div className="logout-slidebar" onClick={handleLogout}>
          <div className="icon-sildebar">
            <img src={LogoutIcon} alt="logout" />
            <span className="menu-label">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Sidebar;