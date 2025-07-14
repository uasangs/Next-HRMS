// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://fbts.flamingohrms.com",
//   withCredentials: true,
// });

// // Normalize guest endpoint paths
// const guestEndpoints = [
//   "api/method/fbts.api.work_duration.get_last_10_attendance_records",
//   "api/method/fbts.api.get_last_checkin_info",
//   "api/method/fbts.api.auth.login",
//   "api/method/fbts.api.auth.generate_otp",
//   "api/method/fbts.api.auth.validate_otp",
//   "api/method/fbts.api.auth.reset_password",
//   "api/method/fbts.api.holiday.get_employee_wise_holidays",
//   "/api/method/fbts.api.leave_balance.get_employee_leave_balance"
// ];

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");

//   // Clean leading slashes
//   const normalizedUrl = config.url?.replace(/^\/+/, "");

//   // Skip token if the URL is in guestEndpoints
//   if (token && !guestEndpoints.includes(normalizedUrl)) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://fbts.flamingohrms.com",
});

// List of endpoints allowed for guest access (no leading slash)
const guestEndpoints = [
  "api/method/fbts.api.work_duration.get_last_10_attendance_records",
  "api/method/fbts.api.get_last_checkin_info",
  "api/method/fbts.api.auth.login",
  "api/method/fbts.api.auth.generate_otp",
  "api/method/fbts.api.auth.validate_otp",
  "api/method/fbts.api.auth.reset_password",
  "api/method/fbts.api.holiday.get_employee_wise_holidays",
  "api/method/fbts.api.leave_balance.get_employee_leave_balance",
  "api/method/fbts.api.get_today_birthdays" // ✅ removed leading slash
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const normalizedUrl = config.url?.replace(/^\/+/, ""); // remove leading slashes

  // If not a guest endpoint, add token
  if (token && !guestEndpoints.includes(normalizedUrl)) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  } else {
    config.withCredentials = false; // No cookies for guest APIs
  }

  return config;
});

export default api;
