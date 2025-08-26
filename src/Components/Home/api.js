// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://fbts.flamingohrms.com",
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
//   "api/method/fbts.api.flamingoApi.get_employees",
//    "api/method/fbts.api.monthly.get_employee_holiday_names",
//    "api/method/fbts.api.leave_request.get_emp_leave_list",
//    "api/method/fbts.api.leave_request.get_leave_applications"
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

const api = axios.create({
  baseURL: "https://fbts.flamingohrms.com",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// List of endpoints that don't require authentication
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
  "api/method/fbts.api.flamingoApi.download_salary_slip",
  "api/method/fbts.api.flamingoApi.chat",
  "api/method/fbts.api.flamingoApi.get_employees",
  "api/method/fbts.api.monthly.get_employee_holiday_names",
  "api/method/fbts.api.leave_request.get_emp_leave_list",
  "api/method/fbts.api.leave_request.get_leave_applications"
];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const normalizedUrl = config.url?.replace(/^\/+/, "");
    
    console.log('API Request:', {
      url: config.url,
      normalized: normalizedUrl,
      method: config.method,
      hasToken: !!token,
      isGuest: guestEndpoints.includes(normalizedUrl)
    });

    // If it's a guest endpoint, no authentication needed
    if (guestEndpoints.includes(normalizedUrl)) {
      console.log('Using guest endpoint (no auth required)');
      config.withCredentials = false;
    } else if (token) {
      // Protected endpoint with token
      console.log('Adding authorization token for protected endpoint');
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true;
    } else {
      // Protected endpoint without token
      console.warn('No token available for protected endpoint:', normalizedUrl);
      config.withCredentials = false;
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      url: response.config.url,
      status: response.status,
      hasData: !!response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.warn('Unauthorized - token may be expired');
    } else if (error.response?.status === 403) {
      console.warn('Forbidden - insufficient permissions');
    } else if (error.response?.status === 404) {
      console.warn('Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

export default api;