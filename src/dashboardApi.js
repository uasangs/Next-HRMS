import api from "./api";

// ✅ Get Last Check-In Info
export const fetchLastCheckIn = async (employeeId) => {
  const res = await api.post("/api/method/fbts.api.get_last_checkin_info", {
    employee: employeeId,
  });
  return res.data.message || {};
};

// ✅ Get Last 10 Attendance Records
export const fetchAttendanceRecords = async (employeeId) => {
  const res = await api.post(
    "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
    { employee: employeeId }
  );
  return res.data.message?.records || [];
};

// ✅ Get Employee-Wise Holidays
export const fetchHolidayList = async (employeeId) => {
  const res = await api.post("/api/method/fbts.api.holiday.get_employee_wise_holidays", {
    employee: employeeId,
  });
  const data = res.data.message || [];
  return Array.isArray(data) && data.length > 0 ? data[0].holidays || [] : [];
};

// ✅ Get Today's Birthdays
export const fetchTodayBirthdays = async () => {
  const res = await api.get("/api/method/fbts.api.get_today_birthdays");
  const data = res.data.message || {};
  return {
    employees: data.employees || [],
    count: data.count || 0,
  };
};
