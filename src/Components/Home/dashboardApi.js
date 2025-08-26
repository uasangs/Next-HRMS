// // Home/dashboardApi.js
// import api from "./api";
// // ✅ Get last 10 attendance records
// export const fetchAttendanceRecords = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
//     { employee: employeeId }
//   );
//   return res.data.message?.records || [];
// };

// // ✅ Get employee‑wise holidays
// export const fetchHolidayList = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.holiday.get_employee_wise_holidays",
//     { employee: employeeId }
//   );
//   const data = res.data.message || [];
//   return Array.isArray(data) && data.length
//     ? data[0].holidays || []
//     : [];
// };

// // ✅ Get today's birthdays
// export const fetchTodayBirthdays = async () => {
//   const res = await api.post(
//     "/api/method/fbts.api.birthday.get_today_birthdays"
//   );
//   const msg = res.data.message || {};
//   return {
//     employees: msg.employees || [],
//     count: msg.count || 0,
//   };
// };

// export const fetchLeaveBalance = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
//     { employee: employeeId }
//   );
//   return res.data.message || [];
// };

// // Home/dashboardApi.js
// export const createLeaveApplication = async (payload) => {
//   const res = await api.post(
//     "/api/method/fbts.api.flamingoApi.create_leave_application",
//     { data: JSON.stringify(payload) }
//   );
//   return res.data.message || {};
// };



// // export const fetchAttendanceRecord = async (employeeId) => {
// //   try {
// //     const response = await fetch("/attendanceData.json"); // static file from /public
// //     const data = await response.json();
// //     return data.attendance;
// //   } catch (error) {
// //     console.error("Failed to fetch local attendance data:", error);
// //     return [];
// //   }
// // };





// // Get monthly attendance/holidays
// export const fetchMonthlyAttendance = async (employeeId, month) => {
//   const res = await api.post(
//     "/api/method/fbts.api.monthly.get_employee_holiday_names",
//     {
//       employee: employeeId,
//       month: month.toLowerCase()  // Ensure lowercase
//     }
//   );
//   return res.data.message || {};
// };



// // Home/dashboardApi.js
// import api from "./api";

// // ✅ Get last 10 attendance records
// export const fetchAttendanceRecords = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
//     { employee: employeeId }
//   );
//   return res.data.message?.records || [];
// };

// // ✅ Get employee‑wise holidays
// export const fetchHolidayList = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.holiday.get_employee_wise_holidays",
//     { employee: employeeId }
//   );
//   const data = res.data.message || [];
//   return Array.isArray(data) && data.length
//     ? data[0].holidays || []
//     : [];
// };

// // ✅ Get today's birthdays
// export const fetchTodayBirthdays = async () => {
//   const res = await api.post(
//     "/api/method/fbts.api.birthday.get_today_birthdays"
//   );
//   const msg = res.data.message || {};
//   return {
//     employees: msg.employees || [],
//     count: msg.count || 0,
//   };
// };

// export const fetchLeaveBalance = async (employeeId) => {
//   const res = await api.post(
//     "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
//     { employee: employeeId }
//   );
//   return res.data.message || [];
// };

// // Home/dashboardApi.js
// export const createLeaveApplication = async (payload) => {
//   const res = await api.post(
//     "/api/method/fbts.api.flamingoApi.create_leave_application",
//     { data: JSON.stringify(payload) }
//   );
//   return res.data.message || {};
// };

// // Get monthly attendance/holidays
// export const fetchMonthlyAttendance = async (employeeId, month) => {
//   const res = await api.post(
//     "/api/method/fbts.api.monthly.get_employee_holiday_names",
//     {
//       employee: employeeId,
//       month: month.toLowerCase()  // Ensure lowercase
//     }
//   );
//   return res.data.message || {};
// };

// // ✅ Get employee leave list with GET/POST fallback
// export const fetchEmployeeLeaveList = async (employeeId) => {
//   try {
//     console.log('🚀 Trying GET request for employee leave list:', employeeId);
    
//     // Try GET request first
//     const res = await api.get(
//       `/api/method/fbts.api.leave_request.get_emp_leave_list?employee=${employeeId}`
//     );
    
//     console.log('✅ GET request successful:', res.data);
//     return res.data.message || [];
    
//   } catch (getError) {
//     console.log('⚠️ GET request failed, trying POST:', getError.message);
    
//     try {
//       // Fallback to POST if GET fails
//       const res = await api.post(
//         "/api/method/fbts.api.leave_request.get_emp_leave_list",
//         { employee: employeeId }
//       );
      
//       console.log('✅ POST request successful:', res.data);
//       return res.data.message || [];
      
//     } catch (postError) {
//       console.error('❌ Both GET and POST requests failed:', {
//         getError: getError.message,
//         postError: postError.message,
//         getStatus: getError.response?.status,
//         postStatus: postError.response?.status
//       });
      
//       // Throw the POST error since it's the expected method
//       throw postError;
//     }
//   }
// };



// // Add this function to your existing dashboardApi.js file
// export const fetchTeamLeaveRequests = async () => {
//   try {
//     console.log('🚀 Trying GET request for team leave requests');
    
//     // Try GET request first
//     const res = await api.get(
//       '/api/method/fbts.api.leave_request.get_leave_applications'
//     );
    
//     console.log('✅ GET request successful for team requests:', res.data);
//     return res.data.message || [];
    
//   } catch (getError) {
//     console.log('⚠️ GET request failed, trying POST:', getError.message);
    
//     try {
//       // Fallback to POST if GET fails
//       const res = await api.post(
//         "/api/method/fbts.api.leave_request.get_leave_applications"
//       );
      
//       console.log('✅ POST request successful for team requests:', res.data);
//       return res.data.message || [];
      
//     } catch (postError) {
//       console.error('❌ Both GET and POST requests failed for team requests:', {
//         getError: getError.message,
//         postError: postError.message,
//         getStatus: getError.response?.status,
//         postStatus: postError.response?.status
//       });
      
//       throw postError;
//     }
//   }
// };


import api from "./api";

// Get last 10 attendance records
export const fetchAttendanceRecords = async (employeeId) => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
      { employee: employeeId }
    );
    return res.data.message?.records || [];
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error;
  }
};

// Get employee-wise holidays
export const fetchHolidayList = async (employeeId) => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.holiday.get_employee_wise_holidays",
      { employee: employeeId }
    );
    const data = res.data.message || [];
    return Array.isArray(data) && data.length
      ? data[0].holidays || []
      : [];
  } catch (error) {
    console.error('Error fetching holiday list:', error);
    throw error;
  }
};

// Get today's birthdays
export const fetchTodayBirthdays = async () => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.birthday.get_today_birthdays"
    );
    const msg = res.data.message || {};
    return {
      employees: msg.employees || [],
      count: msg.count || 0,
    };
  } catch (error) {
    console.error('Error fetching today birthdays:', error);
    throw error;
  }
};

// Get leave balance
export const fetchLeaveBalance = async (employeeId) => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
      { employee: employeeId }
    );
    return res.data.message || {};
  } catch (error) {
    console.error('Error fetching leave balance:', error);
    throw error;
  }
};

// Create leave application
export const createLeaveApplication = async (payload) => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.flamingoApi.create_leave_application",
      { data: JSON.stringify(payload) }
    );
    return res.data.message || {};
  } catch (error) {
    console.error('Error creating leave application:', error);
    throw error;
  }
};

// Get monthly attendance/holidays
export const fetchMonthlyAttendance = async (employeeId, month) => {
  try {
    const res = await api.post(
      "/api/method/fbts.api.monthly.get_employee_holiday_names",
      {
        employee: employeeId,
        month: month.toLowerCase()
      }
    );
    return res.data.message || {};
  } catch (error) {
    console.error('Error fetching monthly attendance:', error);
    throw error;
  }
};

// Get employee leave list (for individual employee)
export const fetchEmployeeLeaveList = async (employeeId) => {
  try {
    console.log('Fetching employee leave list for:', employeeId);
    
    // Try GET request first
    const res = await api.get(
      `/api/method/fbts.api.leave_request.get_emp_leave_list?employee=${employeeId}`
    );
    
    console.log('Employee leave list response:', res.data);
    return res.data.message || [];
    
  } catch (getError) {
    console.log('GET request failed, trying POST:', getError.message);
    
    try {
      const res = await api.post(
        "/api/method/fbts.api.leave_request.get_emp_leave_list",
        { employee: employeeId }
      );
      
      console.log('POST fallback successful:', res.data);
      return res.data.message || [];
      
    } catch (postError) {
      console.error('Both GET and POST requests failed for employee leave list:', {
        getError: getError.message,
        postError: postError.message,
        employeeId
      });
      throw postError;
    }
  }
};

// Get team leave requests (for managers with leave_approver parameter)
export const fetchTeamLeaveRequests = async (leaveApprover = "abdul@gmail.com") => {
  try {
    console.log('Fetching team leave requests for approver:', leaveApprover);
    
    const res = await api.post(
      "/api/method/fbts.api.leave_request.get_leave_applications",
      { leave_approver: leaveApprover }
    );
    
    console.log('Team leave requests response:', res.data);
    return res.data.message || [];
    
  } catch (error) {
    console.error('Error fetching team leave requests:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      approver: leaveApprover
    });
    throw error;
  }
};

// Get current user email for leave approver
export const getCurrentUserEmail = () => {
  return localStorage.getItem('user_email') || 
         localStorage.getItem('email') || 
         localStorage.getItem('username') || 
         "abdul@gmail.com";
};

// Enhanced team leave requests with dynamic approver detection
export const fetchTeamLeaveRequestsForCurrentUser = async () => {
  const currentUserEmail = getCurrentUserEmail();
  return fetchTeamLeaveRequests(currentUserEmail);
};

// Debug function to test API connectivity
export const testAPIConnectivity = async () => {
  const results = {};
  
  try {
    // Test birthday API (guest endpoint)
    console.log('Testing birthday API...');
    const birthdayResult = await fetchTodayBirthdays();
    results.birthday = { success: true, data: birthdayResult };
  } catch (error) {
    results.birthday = { success: false, error: error.message };
  }
  
  try {
    // Test leave balance API
    const employeeId = localStorage.getItem('employee_id') || 'FI-00001';
    console.log('Testing leave balance API...');
    const balanceResult = await fetchLeaveBalance(employeeId);
    results.leaveBalance = { success: true, data: balanceResult };
  } catch (error) {
    results.leaveBalance = { success: false, error: error.message };
  }
  
  return results;
};