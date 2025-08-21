// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Attendance.css";
// import MonthlyAttendance from "./MonthlyAttendance";
// import Header from "../Header/Header";

// const Attendance = () => {
//   const today = new Date().toISOString().split("T")[0];
//   const [view, setView] = useState("daily");
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const employeeId = localStorage.getItem("employeeId");
//       if (!employeeId) return;
//       const res = await axios.get(`http://localhost:5000/api/attendance/${employeeId}`);
//       setRecords(res.data);
//     };

//     fetchAttendance();
//   }, []);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const formatDate = (dateStr) => {
//     const options = { day: "2-digit", month: "short" };
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const recordForSelectedDate = records.find((r) => r.date === selectedDate);

//   return (
//     <>
//       <Header />
//       <div className="attendance-container">
//         <div className="toggle-buttons">
//           <button className={`btn ${view === "daily" ? "active" : ""}`} onClick={() => setView("daily")}>Daily</button>
//           <button className={`btn ${view === "monthly" ? "active" : ""}`} onClick={() => setView("monthly")}>Monthly</button>
//         </div>

//         {view === "daily" ? (
//           <>
//             <h2 className="heading">My Attendance</h2>
//             <div className="date-picker">
//               <label>Select Date:</label>
//               <input type="date" value={selectedDate} onChange={handleDateChange} className="calendar-input" max={today} />
//             </div>
//             <div className="attendance-card">
//               <div className="table-row-daily table-header">
//                 <span>Date</span>
//                 <span>Check In</span>
//                 <span>Check Out</span>
//                 <span>Location</span>
//               </div>
//               {recordForSelectedDate ? (
//                 <div className="table-row-daily">
//                   <span>{formatDate(recordForSelectedDate.date)}</span>
//                   <span>{recordForSelectedDate.checkIn}</span>
//                   <span>{recordForSelectedDate.checkOut}</span>
//                   <span>{recordForSelectedDate.location}</span>
//                 </div>
//               ) : (
//                 <div className="table-row-daily">
//                   <span colSpan={4}>No Record Found</span>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <MonthlyAttendance />
//         )}
//       </div>
//     </>
//   );
// };

// export default Attendance;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Attendance.css";
// import MonthlyAttendance from "./MonthlyAttendance";
// import Header from "../Header/Header";

// const Attendance = () => {
//   const today = new Date().toISOString().split("T")[0];
//   const [view, setView] = useState("daily");
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const res = await axios.get("/attendanceData.json");
//         const updated = res.data.attendance.map(r => ({
//           ...r,
//           checkIn: r.in_time || "--",
//           checkOut: r.out_time || "--",
//           location: r.location || "Andheri"
//         }));
//         setRecords(updated);
//       } catch (err) {
//         console.error("Error loading attendanceData.json:", err);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const formatDate = (dateStr) => {
//     const options = { day: "2-digit", month: "short" };
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const recordForSelectedDate = records.find((r) => r.date === selectedDate);

//   return (
//     <>
//       <Header />
//       <div className="HomeDashboard">
     
//       <h2 className="Atd-heading">My Attendance</h2>
//       <div className="Atd-attendance-container">
//         <div className="Atd-toggle-buttons">
//           <button className={`Atd-btn ${view === "daily" ? "Atd-active" : ""}`} onClick={() => setView("daily")}>Daily</button>
//           <button className={`Atd-btn ${view === "monthly" ? "Atd-active" : ""}`} onClick={() => setView("monthly")}>Monthly</button>
//         </div>

//         {view === "daily" ? (
//           <>
//             <div className="Atd-date-picker">
//               <label>Select Date:</label>
//               <input type="date" value={selectedDate} onChange={handleDateChange} className="Atd-calendar-input" max={today} />
//             </div>
//             <div className="Atd-attendance-card">
//               <div className="Atd-table-row-daily Atd-table-header">
//                 <span>Date</span>
//                 <span>Check In</span>
//                 <span>Check Out</span>
//                 <span>Location</span>
//               </div>
//               {recordForSelectedDate ? (
//                 <div className="Atd-table-row-daily">
//                   <span>{formatDate(recordForSelectedDate.date)}</span>
//                   <span>{recordForSelectedDate.checkIn}</span>
//                   <span>{recordForSelectedDate.checkOut}</span>
//                   <span>{recordForSelectedDate.location}</span>
//                 </div>
//               ) : (
//                 <div className="Atd-table-row-daily">
//                   <span colSpan={4}>No Record Found</span>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <MonthlyAttendance />
//         )}
//       </div>
//        </div>
//     </>
//   );
// };

// export default Attendance;





import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Attendance.css";
import MonthlyAttendance from "./MonthlyAttendance";
import Header from "../Header/Header";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [view, setView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(today);
  const [recordForSelectedDate, setRecordForSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch daily attendance whenever selectedDate changes
  useEffect(() => {
    const fetchDailyAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const employeeId = localStorage.getItem("employee_id") || "FI00077"; // fallback employee ID
        // Example API call, replace URL and params as per your backend API docs
        const res = await axios.get(
          "https://fbts.flamingohrms.com/api/method/fbts.api.daily.get_employee_attendance",
          {
            params: {
              employee_id: employeeId,
              date: selectedDate,
            },
          }
        );

        // Adjust this according to your actual API response structure
        const data = res.data.data || null;

        if (data) {
          setRecordForSelectedDate({
            date: selectedDate,
            checkIn: data.check_in || "--",
            checkOut: data.check_out || "--",
            location: data.location || "Not Available",
          });
        } else {
          setRecordForSelectedDate(null);
        }
      } catch (err) {
        console.error("Error fetching daily attendance:", err);
        setError("Failed to load attendance data.");
        setRecordForSelectedDate(null);
      } finally {
        setLoading(false);
      }
    };

    if (view === "daily") {
      fetchDailyAttendance();
    }
  }, [selectedDate, view]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <Header />
      <div className="HomeDashboard">
        <h2 className="Atd-heading">My Attendance</h2>
        <div className="Atd-attendance-container">
          <div className="Atd-toggle-buttons">
            <button
              className={`Atd-btn ${view === "daily" ? "Atd-active" : ""}`}
              onClick={() => setView("daily")}
            >
              Daily
            </button>
            <button
              className={`Atd-btn ${view === "monthly" ? "Atd-active" : ""}`}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
          </div>

          {view === "daily" ? (
            <>
              <div className="Atd-date-picker">
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="Atd-calendar-input"
                  max={today}
                />
              </div>

              <div className="Atd-attendance-card">
                <div className="Atd-table-row-daily Atd-table-header">
                  <span>Date</span>
                  <span>Check In</span>
                  <span>Check Out</span>
                  <span>Location</span>
                </div>

                {loading ? (
                  <div className="Atd-table-row-daily">Loading...</div>
                ) : error ? (
                  <div className="Atd-table-row-daily">{error}</div>
                ) : recordForSelectedDate ? (
                  <div className="Atd-table-row-daily">
                    <span>{formatDate(recordForSelectedDate.date)}</span>
                    <span>{recordForSelectedDate.checkIn}</span>
                    <span>{recordForSelectedDate.checkOut}</span>
                    <span>{recordForSelectedDate.location}</span>
                  </div>
                ) : (
                  <div className="Atd-table-row-daily">
                    <span colSpan={4}>No Record Found</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <MonthlyAttendance />
          )}
        </div>
      </div>
    </>
  );
};

export default Attendance;
