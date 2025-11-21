// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://fbts.q1ssl.com",
// });

// // List of endpoints allowed for guest access (no leading slash)
// const guestEndpoints = [
//   "api/method/fbts.api.work_duration.get_last_10_attendance_records",
//   "api/method/fbts.api.get_last_checkin_info",
//   "api/method/fbts.api.auth.login",
//   "api/method/fbts.api.auth.generate_otp",
//   "api/method/fbts.api.auth.validate_otp",
//   "api/method/fbts.api.auth.reset_password",
//   "api/method/fbts.api.holiday.get_employee_wise_holidays",
//   "api/method/fbts.api.leave_balance.get_employee_leave_balance",
//   "api/method/fbts.api.birthday.get_today_birthdays",
//   "api/method/fbts.api.flamingoApi.create_checkin",
//   "api/method/fbts.api.flamingoApi.create_leave_application",
//   "api/method/fbts.api.flamingoApi.get_employee_salary_slips",
//   "/api/method/fbts.api.flamingoApi.download_salary_slip",
//   "/api/method/fbts.api.flamingoApi.chat",
//   "api/method/fbts.api.leave_request.get_emp_leave_list",
//   "api/method/fbts.api.flamingoApi.get_employees",
//   "api/method/fbts.api.leave_request.get_leave_applications"
// ];

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   const normalizedUrl = config.url?.replace(/^\/+/, ""); // remove leading slashes

//   // If not a guest endpoint, add token
//   if (token && !guestEndpoints.includes(normalizedUrl)) {
//     config.headers.Authorization = `Bearer ${token}`;
//     config.withCredentials = true;
//   } else {
//     config.withCredentials = false; // No cookies for guest APIs
//   }

//   return config;
// });

// export default api;



import axios from "axios";

// Use the new domain
const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : "https://fbts.q1ssl.com",
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
  "api/method/fbts.api.birthday.get_today_birthdays",
  "api/method/fbts.api.flamingoApi.create_checkin",
  "api/method/fbts.api.flamingoApi.create_leave_application",
  "api/method/fbts.api.flamingoApi.get_employee_salary_slips",
  "/api/method/fbts.api.flamingoApi.download_salary_slip",
  "/api/method/fbts.api.flamingoApi.chat",
  "api/method/fbts.api.leave_request.get_emp_leave_list",
  "api/method/fbts.api.flamingoApi.get_employees",
  "api/method/fbts.api.leave_request.get_leave_applications"
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const normalizedUrl = config.url?.replace(/^\/+/, "");

  // Don't use withCredentials - it causes CORS preflight issues
  config.withCredentials = false;

  // If not a guest endpoint, add token
  if (token && !guestEndpoints.includes(normalizedUrl)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("API Request:", config.method, config.baseURL + config.url);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: (error.config?.baseURL || "") + (error.config?.url || ""),
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;