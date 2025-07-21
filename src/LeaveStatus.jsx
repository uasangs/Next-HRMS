import React, { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
  Approved: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
  },
  Rejected: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },
  Cancelled: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-300",
  },
  Open: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
  },
  Default: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
};

const LeaveStatus = () => {
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const employeeId = localStorage.getItem("employee_id");

  useEffect(() => {
    const fetchLeaveStatus = async () => {
      try {
        const { data } = await axios.get(
          "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.leave_status",
          {
            params: { employee: employeeId },
          }
        );
        if (Array.isArray(data.message)) {
          setLeaveStatus(data.message);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching leave status:", err);
        setError("Failed to fetch leave status.");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchLeaveStatus();
    } else {
      setError("No employee ID found in local storage");
      setLoading(false);
    }
  }, [employeeId]);

  if (loading) return <div className="p-4 text-gray-600">Loading leave status...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave Status Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {leaveStatus.map((item, index) => {
          const style = statusStyles[item.status] || statusStyles.Default;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl shadow border ${style.bg} ${style.border} flex flex-col items-center justify-center text-center`}
            >
              <div className={`text-sm font-semibold uppercase ${style.text}`}>
                {item.status}
              </div>
              <div className={`text-3xl font-bold mt-2 ${style.text}`}>
                {item.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveStatus;
