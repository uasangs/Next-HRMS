import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MonthlyAttendance.css";

const months2025 = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthlyAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState("June");
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    axios.get("/data/attendanceData.json")
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="monthly-container">
      <h2 className="heading">My Attendance</h2>

      <div className="month-selector">
        <label htmlFor="month">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {months2025.map((month) => (
            <option key={month} value={month}>{month} 2025</option>
          ))}
        </select>
      </div>

      <div className="table">
        <div className="table-row header">
          <span>Date</span>
          <span>Day</span>
          <span>Check In</span>
          <span>Check Out</span>
          <span>Status</span>
          <span>Working Hrs</span>
          <span>LC</span>
          <span>Weekly Hrs</span>
          <span>Action</span>
        </div>

        {attendanceData[selectedMonth] && attendanceData[selectedMonth].length > 0 ? (
          attendanceData[selectedMonth].map((row, i) => (
            <div className="table-row" key={i}>
              <span>{row.date}</span>
              <span>{row.day}</span>
              <span>{row.in}</span>
              <span>{row.out}</span>
              <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
              <span>{row.hrs}</span>
              <span>{row.lc}</span>
              <span>{row.weekHrs}</span>
              <span className={row.approved ? "approved" : ""}>
                {row.action === "Regularise" ? (
                  <button className="regularise-btn">Regularise</button>
                ) : (
                  row.action
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="no-records">No Records Found</div>
        )}
      </div>
    </div>
  );
};

export default MonthlyAttendance;
