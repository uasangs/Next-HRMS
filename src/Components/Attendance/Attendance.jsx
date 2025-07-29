import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Attendance.css";
import MonthlyAttendance from "./MonthlyAttendance";
import Header from "../Header/Header";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [view, setView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(today);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const employeeId = localStorage.getItem("employeeId");
      if (!employeeId) return;
      const res = await axios.get(`http://localhost:5000/api/attendance/${employeeId}`);
      setRecords(res.data);
    };

    fetchAttendance();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "short" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  const recordForSelectedDate = records.find((r) => r.date === selectedDate);

  return (
    <>
      <Header />
      <div className="attendance-container">
        <div className="toggle-buttons">
          <button className={`btn ${view === "daily" ? "active" : ""}`} onClick={() => setView("daily")}>Daily</button>
          <button className={`btn ${view === "monthly" ? "active" : ""}`} onClick={() => setView("monthly")}>Monthly</button>
        </div>

        {view === "daily" ? (
          <>
            <h2 className="heading">My Attendance</h2>
            <div className="date-picker">
              <label>Select Date:</label>
              <input type="date" value={selectedDate} onChange={handleDateChange} className="calendar-input" max={today} />
            </div>
            <div className="attendance-card">
              <div className="table-row-daily table-header">
                <span>Date</span>
                <span>Check In</span>
                <span>Check Out</span>
                <span>Location</span>
              </div>
              {recordForSelectedDate ? (
                <div className="table-row-daily">
                  <span>{formatDate(recordForSelectedDate.date)}</span>
                  <span>{recordForSelectedDate.checkIn}</span>
                  <span>{recordForSelectedDate.checkOut}</span>
                  <span>{recordForSelectedDate.location}</span>
                </div>
              ) : (
                <div className="table-row-daily">
                  <span colSpan={4}>No Record Found</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <MonthlyAttendance />
        )}
      </div>
    </>
  );
};

export default Attendance;
