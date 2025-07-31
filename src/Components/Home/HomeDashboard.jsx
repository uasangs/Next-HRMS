import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";
import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import Arrow from "../../assets/Arrow.png";
import Header from "../Header/Header";
import Checkin from "./Checkin";
import {
  fetchAttendanceRecords,
  fetchHolidayList,
  fetchTodayBirthdays,
} from "./dashboardApi";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const HomeDashboard = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [birthdayList, setBirthdayList] = useState([]);
  const [birthdayCount, setBirthdayCount] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("employee_id");
    if (id) setEmployeeId(id);
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    const fetchData = async () => {
      try {
        const [records, holidayList, birthdayData] = await Promise.all([
          fetchAttendanceRecords(employeeId),
          fetchHolidayList(employeeId),
          fetchTodayBirthdays(),
        ]);

        const today = dayjs();
        const endOfYear = dayjs().endOf("year");

        // Filter upcoming holidays: from today to 31 Dec inclusive
        const upcoming = holidayList.filter((h) => {
          const date = dayjs(h.holiday_date, "DD-MM-YYYY");
          return (
            date.isValid() &&
            (date.isSame(today, "day") ||
              (date.isAfter(today, "day") && date.isBefore(endOfYear.add(1, "day"))))
          );
        });

        // Prepare last 3 dates excluding today (format in API response format DD-MM-YYYY)
        const lastThreeDates = Array.from({ length: 3 }, (_, i) =>
          today.subtract(i + 1, "day").format("DD-MM-YYYY")
        );

        // Map attendance records by date for easy lookup (dates are in "DD-MM-YYYY")
        const attendanceMap = {};
        records.forEach((r) => {
          attendanceMap[r.date] = r;
        });

        // Build attendance data for last 3 days with fallback if missing
        const lastThreeAttendance = lastThreeDates.map((dateStr) => {
          const rec = attendanceMap[dateStr];
          const parsedDate = dayjs(dateStr, "DD-MM-YYYY");
          if (rec) {
            return {
              date: dateStr, // Show backend format
              in_time: rec.in_time || "--",
              out_time: rec.out_time || "--",
              working_hours: rec.working_hours || "--",
              status: rec.status || "--",
            };
          } else {
            return {
              date: dateStr,
              in_time: "--",
              out_time: "--",
              working_hours: "--",
              status: "Absent",
            };
          }
        });

        setAttendanceRecords(lastThreeAttendance);
        setHolidays(upcoming.slice(0, 5));
        setBirthdayList(birthdayData.employees || []);
        setBirthdayCount(birthdayData.count || 0);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    fetchData();
  }, [employeeId]);

  return (
    <div className="HomeDashboard">
      <Header />
      <h2>Welcome Back</h2>

      <div className="home-checkIn">
        <Checkin employeeId={employeeId} />
      </div>

      <div className="widgets-container">
        {/* Attendance */}
        <div className="widget-column">
          <h3>My Attendance</h3>
          <div className="widget">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Hrs</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((rec, idx) => (
                    <tr key={idx}>
                      <td>{rec.date}</td>
                      <td>{rec.in_time}</td>
                      <td>{rec.out_time}</td>
                      <td>{rec.working_hours}</td>
                      <td className={`status ${rec.status?.toLowerCase()}`}>
                        {rec.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Attendance Records</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Link to="/attendance">
              <div className="calendar-link">
                <FaCalendarAlt className="icon" /> My Attendance Calendar
                <span>
                  <div className="icon-sildebar">
                    <img src={Arrow} alt="arrow" />
                  </div>
                </span>
              </div>
            </Link>
          </div>

          <Link to="/myleave">
            <div className="widget link-box">
              Leave Balance
              <span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </span>
            </div>
          </Link>

          <div className="widget birthday-box">
            <FaBirthdayCake className="icon" /> Today's Birthday
            <span className="count">{birthdayCount}</span>
            <span>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </span>
            {birthdayList.length > 0 && (
              <ul className="birthday-list">
                {birthdayList.map((emp, idx) => (
                  <li key={idx}>
                    {emp.employee_name} ({dayjs(emp.date_of_birth).format("DD MMM")})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Links & Holidays */}
        <div className="widget-column">
          <h3>Quick Links</h3>
          <div className="widget holiday-list">
            <Link to="holiday-list">
              <div className="Holidays-list-arrowBTN">
                <div>Holidays List</div>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </Link>
            <table>
              <tbody>
                {holidays.length > 0 ? (
                  holidays.map((h, idx) => (
                    <tr key={idx}>
                      <td>{h.holiday_date}</td> {/* Use backend format directly */}
                      <td>{dayjs(h.holiday_date, "DD-MM-YYYY").format("dddd")}</td>
                      <td>{h.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No upcoming holidays.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="widget-cards-container">
            <div className="widget-card">
              <div className="widget-card-header">
                <span className="widget-card-title">Leave Request</span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
              <div className="widget-card-badge-section">
                <span className="badge">0</span>
              </div>
            </div>

            <div className="widget-card">
              <div className="widget-card-header">
                <span className="widget-card-title">Attendance Regularise</span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
              <div className="widget-card-content">
                <div className="widget-card-subtitle">
                  <span className="small-text">Pending Approval</span>
                  <span className="badge">5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="widget link-box">
            Company Policy
            <span>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
