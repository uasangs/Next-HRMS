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
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
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

            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeSidebar}
            >
              <li>
                <div className="icon-sildebar">
                  <img src={MyProfile} alt="profile" />
                  <span className="menu-label">My Profile</span>
                </div>
              </li>
            </NavLink>

            <li
              onClick={() => toggleDropdown("attendance")}
              className={openDropdown === "attendance" ? "dropdown-open" : ""}
            >
              <div className="icon-sildebar">
                <img src={Attendance} alt="attendance" />
                <span className="menu-label">Attendance</span>
              </div>
              {openDropdown === "attendance" && (
                <ul className="submenu">
                  <NavLink
                    to="/attendance"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>My Attendance</li>
                  </NavLink>
                  <NavLink
                    to="/regularise"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Regularise</li>
                  </NavLink>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("leave")}
              className={openDropdown === "leave" ? "dropdown-open" : ""}
            >
              <div className="icon-sildebar">
                <img src={Leave} alt="leave" />
                <span className="menu-label">Leave</span>
              </div>
              {openDropdown === "leave" && (
                <ul className="submenu">
                  <NavLink
                    to="/myleave"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>My Leave</li>
                  </NavLink>
                  <NavLink
                    to="/leaverequest"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeSidebar}
                  >
                    <li>Leave Request</li>
                  </NavLink>
                </ul>
              )}
            </li>

            <NavLink
              to="/salary"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeSidebar}
            >
              <li>
                <div className="icon-sildebar">
                  <img src={Salary} alt="Salary" />
                  <span className="menu-label">Salary</span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="/it"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeSidebar}
            >
              <li>
                <div className="icon-sildebar">
                  <img src={ITComputation} alt="IT" />
                  <span className="menu-label">IT Computation</span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="/expenses"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeSidebar}
            >
              <li>
                <div className="icon-sildebar">
                  <img src={Expenses} alt="Expenses" />
                  <span className="menu-label">Expenses</span>
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
