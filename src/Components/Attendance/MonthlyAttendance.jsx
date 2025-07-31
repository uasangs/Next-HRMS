import React, { useState, useEffect } from "react";
import "./MonthlyAttendance.css";
import { fetchAttendanceRecords } from "../Home/dashboardApi"; // API function
import dayjs from "dayjs";

const months2025 = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthlyAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");
    if (!employeeId) return;

    const fetchData = async () => {
      try {
        const records = await fetchAttendanceRecords(employeeId);
        console.log("API Records:", records); // ✅ debug line

        const formatted = records.map(r => {
          const parsed = dayjs(r.date, "DD-MM-YYYY");
          return {
            ...r,
            month: parsed.isValid() ? parsed.format("MMMM") : "--",
            day: parsed.isValid() ? parsed.format("ddd") : "--",
            dateFormatted: parsed.isValid() ? parsed.format("DD MMM") : r.date,
            lc: "--",              // Optional: placeholder
            weekHrs: "--",         // Optional: placeholder
            action: "Regularise",  // Optional: default action
            approved: false,       // Optional: default approval
          };
        });

        setAttendanceData(formatted);
      } catch (err) {
        console.error("Error fetching attendance records:", err);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value.split(" ")[0]); // e.g. "July 2025" -> "July"
  };

  // ✅ Ensure month match is case-insensitive
  const monthRecords = attendanceData.filter(
    r => r.month?.toLowerCase() === selectedMonth.toLowerCase()
  );

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

        {monthRecords.length > 0 ? (
          monthRecords.map((row, i) => (
            <div className="table-row" key={i}>
              <span>{row.dateFormatted}</span>
              <span>{row.day}</span>
              <span>{row.in_time || "--"}</span>
              <span>{row.out_time || "--"}</span>
              <span className={`status ${row.status?.toLowerCase()}`}>{row.status || "--"}</span>
              <span>{row.working_hours || "--"}</span>
              <span>{row.lc}</span>
              <span>{row.weekHrs}</span>
              <span className={row.approved ? "approved" : ""}>
                {row.action === "Regularise" ? (
                  <button className="regularise-btn">Regularise</button>
                ) : (
                  row.action || "--"
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
