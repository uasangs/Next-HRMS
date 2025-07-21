import React, { useEffect, useState } from "react";
import api from "./api";
import CreateLeave from "./CreateLeave";
import LeaveStatus from "./LeaveStatus";

const Leave = () => {
  const [leaveData, setLeaveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const employeeId = localStorage.getItem("employee_id");

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const response = await api.post(
          "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
          { employee: employeeId }
        );

        if (response.data.message) {
          setLeaveData(response.data.message);
        } else {
          setError("No leave data returned from server.");
        }
      } catch (err) {
        console.error("Error fetching leave data:", err);
        setError("Failed to fetch leave data.");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchLeaveBalance();
    } else {
      setError("No employee ID found in local storage.");
      setLoading(false);
    }
  }, [employeeId]);

  if (loading) {
    return <div className="p-8 text-xl">Loading leave data...</div>;
  }

  if (error) {
    return <div className="p-8 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Leave Balance</h2>

        {Object.keys(leaveData).length === 0 ? (
          <div className="text-gray-600">No leave data available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(leaveData).map(([type, balance]) => (
              <div
                key={type}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-all"
              >
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {type}
                </div>
                <div className="text-3xl font-bold text-indigo-700">{balance}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LeaveStatus />
      <CreateLeave employeeId={employeeId} />
    </div>
  );
};

export default Leave;
