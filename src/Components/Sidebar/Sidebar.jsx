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
import Logout from "../../assets/Logout.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Flamingo Infinite Logo" />
      </div>

      <div className="slidebar-all-links">
        <ul className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            <li><div className="icon-sildebar"><img src={Home} alt="home" /> Home</div></li>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
            <li><div className="icon-sildebar"><img src={MyProfile} alt="profile" /> My Profile</div></li>
          </NavLink>

          <li onClick={() => toggleDropdown("attendance")} className={openDropdown === "attendance" ? "dropdown-open" : ""}>
            <div className="icon-sildebar">
              <img src={Attendance} alt="attendance" /> Attendance
            </div>
            {openDropdown === "attendance" && (
              <ul className="submenu">
                <NavLink to="/attendance" className={({ isActive }) => isActive ? "active" : ""}>
                  <li>My Attendance</li>
                </NavLink>
                <NavLink to="/regularise" className={({ isActive }) => isActive ? "active" : ""}>
                  <li>Regularise</li>
                </NavLink>
              </ul>
            )}
          </li> 

        
          <li onClick={() => toggleDropdown("leave")} className={openDropdown === "leave" ? "dropdown-open" : ""}>
            <div className="icon-sildebar">
              <img src={Leave} alt="leave" /> Leave
            </div>
            {openDropdown === "leave" && (
              <ul className="submenu">
                <NavLink to="/attendance/request" className={({ isActive }) => isActive ? "active" : ""}>
                  <li>My Leave</li>
                </NavLink>
                <NavLink to="/leaverequest" className={({ isActive }) => isActive ? "active" : ""}>
                  <li>Leave Request</li>
                </NavLink>
              </ul>
            )}
          </li>

          <NavLink to="/salary" className={({ isActive }) => isActive ? "active" : ""}>
            <li><div className="icon-sildebar"><img src={Salary} alt="Salary" />Salary</div></li>
          </NavLink>
          
          <NavLink to="/it" className={({ isActive }) => isActive ? "active" : ""}>
            <li><div className="icon-sildebar"><img src={ITComputation} alt="Salary" />IT Computation</div></li>
          </NavLink>
          {/* <li onClick={() => toggleDropdown("it")} className={openDropdown === "it" ? "dropdown-open" : ""}>
            <div className="icon-sildebar"><img src={ITComputation} alt="it" /> IT Computation</div>
          </li> */}
          
          <NavLink to="/expenses" className={({ isActive }) => isActive ? "active" : ""}>
            <li><div className="icon-sildebar"><img src={Expenses} alt="Expenses" />Expenses</div></li>
          </NavLink>
          {/* <li onClick={() => toggleDropdown("expenses")} className={openDropdown === "expenses" ? "dropdown-open" : ""}>
            <div className="icon-sildebar"><img src={Expenses} alt="expenses" /> Expenses</div>
          </li> */}

        </ul>
      </div>

      <div className="logout-slidebar">
        <div className="icon-sildebar">
          <img src={Logout} alt="logout" />
        </div>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
