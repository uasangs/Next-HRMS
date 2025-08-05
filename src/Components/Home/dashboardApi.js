// import api from "./api";

// // ✅ Get Last Check-In Info
// export const fetchLastCheckIn = async (employeeId) => {
//   const res = await api.post("/api/method/fbts.api.get_last_checkin_info", {
//     employee: employeeId,
//   });
//   return res.data.message || {};
// };

// // ✅ Get Last 10 Attendance Records
// export const fetchAttendanceRecords = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
//     { employee: employeeId }
//   );
//   return res.data.message?.records || [];
// };

// // ✅ Get Employee-Wise Holidays
// export const fetchHolidayList = async (employeeId) => {
//   const res = await api.post("/api/method/fbts.api.holiday.get_employee_wise_holidays", {
//     employee: employeeId,
//   });
//   const data = res.data.message || [];
//   return Array.isArray(data) && data.length > 0 ? data[0].holidays || [] : [];
// };

// // ✅ Get Today's Birthdays
// export const fetchTodayBirthdays = async () => {
//   const res = await api.post("/api/method/fbts.api.birthday.get_today_birthdays");
//   const data = res.data.message || {};
//   return {
//     employees: data.employees || [],
//     count: data.count || 0,
//   };
// };







// Home/dashboardApi.js
import api from "./api";
// ✅ Get last 10 attendance records
export const fetchAttendanceRecords = async (employeeId) => {
  const res = await api.post(
    "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
    { employee: employeeId }
  );
  return res.data.message?.records || [];
};

export const fetchAttendanceRecord = async (employeeId) => {
  try {
    const response = await fetch("/attendanceData.json"); // static file from /public
    const data = await response.json();
    return data.attendance;
  } catch (error) {
    console.error("Failed to fetch local attendance data:", error);
    return [];
  }
};

// ✅ Get employee‑wise holidays
export const fetchHolidayList = async (employeeId) => {
  const res = await api.post(
    "/api/method/fbts.api.holiday.get_employee_wise_holidays",
    { employee: employeeId }
  );
  const data = res.data.message || [];
  return Array.isArray(data) && data.length
    ? data[0].holidays || []
    : [];
};

// ✅ Get today's birthdays
export const fetchTodayBirthdays = async () => {
  const res = await api.post(
    "/api/method/fbts.api.birthday.get_today_birthdays"
  );
  const msg = res.data.message || {};
  return {
    employees: msg.employees || [],
    count: msg.count || 0,
  };
};

export const fetchLeaveBalance = async (employeeId) => {
  const res = await api.post(
    "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
    { employee: employeeId }
  );
  return res.data.message || [];
};

// Home/dashboardApi.js
export const createLeaveApplication = async (payload) => {
  const res = await api.post(
    "/api/method/fbts.api.flamingoApi.create_leave_application",
    { data: JSON.stringify(payload) }
  );
  return res.data.message || {};
};

