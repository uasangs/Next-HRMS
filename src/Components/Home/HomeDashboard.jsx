// import React from "react";
// import "./HomeDashboard.css";
// import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
// import Arrow  from  "../../assets/Arrow.png";
// import Header from "../Header/Header";
// import Checkin from "./Checkin";


// const HomeDashboard = () => {
//   return (
//     <div className="HomeDashboard"> 
//     <Header/>
//         <h2>Welcome Back</h2>
//         <div className="home-checkIn">
//             <Checkin/>
//         </div>
//     <div className="widgets-container">
//       <div className="widget-column">
//          <h3>My Attendance</h3>
//         <div className="widget">
         
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Check In</th>
//                 <th>Check Out</th>
//                 <th>Total Hrs</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>9 Jun</td>
//                 <td>00:00</td>
//                 <td>00:00</td>
//                 <td>0:00</td>
//                 <td className="status ab">AB</td>
//               </tr>
//               <tr>
//                 <td>8 Jun</td>
//                 <td>10:00</td>
//                 <td>18:45</td>
//                 <td>8:45</td>
//                 <td className="status p">P</td>
//               </tr>
//               <tr>
//                 <td>7 Jun</td>
//                 <td>10:00</td>
//                 <td>02:50</td>
//                 <td>5:50</td>
//                 <td className="status hd">HD</td>
//               </tr>
//               <tr>
//                 <td>6 Jun</td>
//                 <td>00:00</td>
//                 <td>00:00</td>
//                 <td>0:00</td>
//                 <td className="status cl">CL</td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="calendar-link">
//             <FaCalendarAlt className="icon" /> My Attendance Calendar <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
//           </div>
//         </div>

//         <div className="widget link-box">
//           Leave Balance <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
//         </div>

//         <div className="widget birthday-box">
//           <FaBirthdayCake className="icon" /> Today's Birthday <span className="count">3</span> <span> <div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div>
//           </span>
//         </div>
//       </div>

//       <div className="widget-column">
//         <h3>Quick Links</h3>

//         <div className="widget holiday-list">
//          <div className="Holidays-list-arrowBTN">
//           <div>Holidays List </div>
//           <div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div>
//           </div> 

//           <table>
//             <tbody>
//               <tr>
//                 <td>15 Aug</td>
//                 <td>Fri</td>
//                 <td>Independence Day</td>
//               </tr>
//               <tr>
//                 <td>27 Aug</td>
//                 <td>Wed</td>
//                 <td>Ganesh Chaturthi</td>
//               </tr>
//               <tr>
//                 <td>02 Oct</td>
//                 <td>Thurs</td>
//                 <td>Mahatma Gandhi Jayanti</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
      
// <div className="widget-cards-container">
//   <div className="widget-card">
//     <div className="widget-card-header">
//       <span className="widget-card-title">Leave Request</span>
//       <div className="icon-sildebar">
//         <img src={Arrow} alt="arrow" />
//       </div>
//     </div>
//     <div className="widget-card-badge-section">
//       <span className="badge">0</span>
//     </div>
//   </div>

//   <div className="widget-card">
//     <div className="widget-card-header">
//       <span className="widget-card-title">Attendance Regularise</span>
//       <div className="icon-sildebar">
//         <img src={Arrow} alt="arrow" />
//       </div>
//     </div>
//     <div className="widget-card-content">
//       <div className="widget-card-subtitle">
//         <span className="small-text">Pending Approval</span>
//         <span className="badge">5</span>
//       </div>
//     </div>
//   </div>
// </div>

//         <div className="widget link-box">
//           Company Policy <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default HomeDashboard;




// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // // import logo from "./assets/flamingo-logo.png";
// // import dayjs from "dayjs";
// // // import Checkin from './Checkin';
// // // import LeaveRequest from './LeaveRequest'
// // // import ChatForm from "./ChatForm";
// // import {
// //   fetchLastCheckIn,
// //   fetchAttendanceRecords,
// //   fetchHolidayList,
// //   fetchTodayBirthdays,
// // } from "./dashboardApi";

// // const Dashboard = () => {
// //   const [employee, setEmployee] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [lastCheckIn, setLastCheckIn] = useState(null);
// //   const [attendanceRecords, setAttendanceRecords] = useState([]);
// //   const [holidays, setHolidays] = useState([]);
// //   const [birthdayList, setBirthdayList] = useState([]);
// //   const [birthdayCount, setBirthdayCount] = useState(0);
// //   const [showBirthdays, setShowBirthdays] = useState(false);
// //   const [showChat, setShowChat] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fullName = localStorage.getItem("employee_name");
// //     const employeeId = localStorage.getItem("employee_id");

// //     if (fullName && employeeId) {
// //       setEmployee({ employee_name: fullName, name: employeeId });
// //     } else {
// //       setEmployee(null);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const loadDashboardData = async () => {
// //       if (!employee?.name) return;

// //       try {
// //         const [checkIn, records, holidayList] = await Promise.all([
// //           fetchLastCheckIn(employee.name),
// //           fetchAttendanceRecords(employee.name),
// //           fetchHolidayList(employee.name),
// //         ]);

// //         setLastCheckIn(checkIn);
// //         setAttendanceRecords(records);
// //         setHolidays(holidayList);
// //       } catch (err) {
// //         console.error("Error loading dashboard data:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const loadBirthdays = async () => {
// //       try {
// //         const { employees, count } = await fetchTodayBirthdays();
// //         setBirthdayList(employees);
// //         setBirthdayCount(count);
// //       } catch (err) {
// //         console.error("Error fetching birthdays:", err);
// //       }
// //     };

// //     loadBirthdays();
// //     loadDashboardData();
// //   }, [employee]);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     window.location.reload();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
// //         Loading employee data...
// //       </div>
// //     );
// //   }

// //   if (!employee) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
// //         Unable to load employee info. Please login again.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen bg-gray-50 font-sans">
// //       <aside className="w-64 bg-gradient-to-br from-[#1C2B83] to-[#1C2B83] text-white flex flex-col justify-between py-6 px-4">
// //         <div>
// //           <img src={logo} alt="Flamingo Logo" className="h-14 mx-auto mb-8" />
// //           <nav className="space-y-6">
// //             <NavItem icon="🏠" label="Home" to="/dashboard" />
// //             <NavItem icon="👤" label="My Profile" to="/profile" />
// //             <NavItem icon="🖐️" label="Attendance" to="/attendance" />
// //             <NavItem icon="📅" label="Leave" to="/leave" />
// //             <NavItem icon="💰" label="Salary" to="/salary" />
// //             <NavItem icon="📊" label="IT Computation" to="/it-computation" />
// //             <NavItem icon="🧾" label="Expenses" to="/expenses" />
// //           </nav>
// //         </div>
// //         <button
// //           onClick={handleLogout}
// //           className="flex items-center text-sm text-white gap-2 hover:opacity-80"
// //         >
// //           <span>⏻</span> Logout
// //         </button>
// //       </aside>

// //       <main className="flex-1 p-8">
// //         <header className="flex justify-between items-center mb-6">
// //           <h1 className="text-2xl font-semibold text-gray-800">Employee Self Service</h1>
// //           <div className="flex items-center gap-4">
// //             <span className="text-gray-700 font-medium">{employee.name}</span>
// //             <button className="text-gray-500 text-xl">🔔</button>
// //             <div className="relative">
// //               <button
// //                 className="text-gray-500 text-xl"
// //                 onClick={() => setShowChat(!showChat)}
// //               >
// //                 💬
// //               </button>

// //               {showChat && (
// //                 <div className="absolute right-0 top-10 z-50 w-[400px]">
// //                   <ChatForm onClose={() => setShowChat(false)} />
// //                 </div>
// //               )}
// //             </div>

// //           </div>
// //         </header>

// //         <div className="text-pink-600 text-xl font-bold mb-1">
// //           Welcome! {employee.employee_name}
// //         </div>

// //         {lastCheckIn && (
// //           <div className="mb-4 p-3 bg-yellow-100 text-sm text-gray-700 rounded shadow w-96 text-center rounded-2xl">
// //             <strong>
// //               {lastCheckIn.log_type === "IN" ? "Last Check-In:" : "Last Check-Out:"}
// //             </strong>{" "}
// //             {dayjs(lastCheckIn.time).format("DD MMM YYYY, hh:mm A")}
// //           </div>
// //         )}

// //         <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-48">
// //           <Checkin employeeId={employee.name} />
// //         </div>

// //         <div className="grid grid-cols-3 gap-6 mb-6">
// //           <div className="bg-pink-50 p-4 rounded shadow-sm col-span-2 overflow-auto">
// //             <h2 className="text-pink-600 font-semibold mb-2">My Attendance</h2>
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-sm min-w-[600px]">
// //                 <thead className="text-left text-gray-600">
// //                   <tr>
// //                     <th>Date</th>
// //                     <th>Check In</th>
// //                     <th>Check Out</th>
// //                     <th>Total Hrs</th>
// //                     <th>Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="text-gray-800">
// //                   {attendanceRecords.map((rec, idx) => (
// //                     <tr key={idx}>
// //                       <td>{rec.date}</td>
// //                       <td>{rec.in_time || "--"}</td>
// //                       <td>{rec.out_time || "--"}</td>
// //                       <td>{rec.working_hours || "--"}</td>
// //                       <td>
// //                         <span
// //                           className={`font-semibold px-2 py-1 rounded ${rec.status === "Present"
// //                             ? "text-green-700"
// //                             : "text-red-700"
// //                             }`}
// //                         >
// //                           {rec.status}
// //                         </span>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //           <div className="space-y-4">
// //             <div className="bg-pink-50 p-4 rounded shadow-sm">
// //               <h3 className="text-pink-600 font-semibold mb-2">Holiday List</h3>
// //               <ul className="text-sm text-gray-800 space-y-1 max-h-40 overflow-y-auto pr-2">
// //                 {holidays.length > 0 ? (
// //                   holidays.map((h, idx) => (
// //                     <li key={idx}>
// //                       {dayjs(h.holiday_date).format("DD MMM")} - {h.description}
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <li>No holidays found.</li>
// //                 )}
// //               </ul>
// //             </div>
// //             <div className="grid grid-cols-2 gap-2">
// //               <LeaveRequest />
// //             </div>
// //           </div>

// //           <div className="bg-pink-50 p-4 rounded shadow-sm">
// //             <h3
// //               className="text-pink-600 font-semibold mb-2 cursor-pointer flex justify-between"
// //               onClick={() => setShowBirthdays(!showBirthdays)}
// //             >
// //               <span>🎂 Today's Birthdays</span>
// //               <span className="bg-pink-300 text-white rounded px-2 py-0.5 text-xs font-semibold">
// //                 {birthdayCount}
// //               </span>
// //             </h3>
// //             {showBirthdays && (
// //               <ul className="text-sm text-gray-800 space-y-1 max-h-40 overflow-y-auto pr-2">
// //                 {birthdayList.length > 0 ? (
// //                   birthdayList.map((emp, idx) => (
// //                     <li key={idx}>
// //                       {emp.employee_name} ({dayjs(emp.date_of_birth).format("DD MMM")})
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <li>No birthdays today.</li>
// //                 )}
// //               </ul>
// //             )}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // const NavItem = ({ icon, label, to }) => {
// //   const navigate = useNavigate();
// //   return (
// //     <div
// //       className="flex items-center gap-3 text-white hover:text-pink-300 cursor-pointer"
// //       onClick={() => navigate(to)}
// //     >
// //       <span className="text-lg">{icon}</span>
// //       <span>{label}</span>
// //     </div>
// //   );
// // };

// // const LinkCard = ({ title, count }) => (
// //   <div className="bg-pink-50 p-4 rounded shadow-sm text-sm text-gray-800 flex justify-between items-center">
// //     <span>{title}</span>
// //     <span className="bg-pink-300 text-white rounded px-2 py-0.5 text-xs font-semibold">
// //       {count}
// //     </span>
// //   </div>
// // );

// // export default Dashboard;










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

        // Holidays from today to Dec 31
        const upcomingHolidays = holidayList.filter(h => {
          const date = dayjs(h.holiday_date);
          return date.isSame(today, "day") ||
                 (date.isAfter(today, "day") && date.isBefore(endOfYear.add(1, "day")));
        });

        // Last 3 calendar days (today excluded)
        const pastThreeDates = [...Array(3)].map((_, i) =>
          dayjs().subtract(i + 1, "day").format("YYYY-MM-DD")
        );

        const pastThreeDays = pastThreeDates.map(date => {
          const found = records.find(r =>
            dayjs(r.date).format("YYYY-MM-DD") === date
          );
          return found ? {
            date: dayjs(found.date).format("DD MMM"),
            in_time: found.in_time || "--",
            out_time: found.out_time || "--",
            working_hours: found.working_hours || "--",
            status: found.status,
          } : {
            date: dayjs(date).format("DD MMM"),
            in_time: "--",
            out_time: "--",
            working_hours: "--",
            status: "AB", // mark absent when missing
          };
        });

        setAttendanceRecords(pastThreeDays);
        setHolidays(upcomingHolidays);
        setBirthdayList(birthdayData.employees || []);
        setBirthdayCount(birthdayData.count || 0);

      } catch (error) {
        console.error("Error loading dashboard data:", error);
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
                {attendanceRecords.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.date}</td>
                    <td>{rec.in_time}</td>
                    <td>{rec.out_time}</td>
                    <td>{rec.working_hours}</td>
                    <td className={`status ${rec.status?.toLowerCase()}`}>
                      {rec.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="calendar-link">
              <FaCalendarAlt className="icon" /> My Attendance Calendar{" "}
              <span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </span>
            </div>
          </div>

          <div className="widget link-box">
            Leave Balance{" "}
            <span>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </span>
          </div>

          <div className="widget birthday-box">
            <FaBirthdayCake className="icon" /> Today's Birthday{" "}
            <span className="count">{birthdayCount}</span>{" "}
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

        <div className="widget-column">
          <h3>Quick Links</h3>

          <div className="widget holiday-list">
            <div className="Holidays-list-arrowBTN">
              <div>Holidays List</div>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </div>
            <table>
              <tbody>
                {holidays.length > 0 ? (
                  holidays.map((h, idx) => (
                    <tr key={idx}>
                      <td>{dayjs(h.holiday_date).format("DD MMM")}</td>
                      <td>{dayjs(h.holiday_date).format("ddd")}</td>
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
            Company Policy{" "}
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
