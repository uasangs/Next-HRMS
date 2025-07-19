import React, { useEffect, useState } from "react";
import api from "./api"; // Make sure this is your configured Axios instance
import CreateLeave from './CreateLeave'
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
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Leave Balance</h2>

      {Object.keys(leaveData).length === 0 ? (
        <div>No leave data available.</div>
      ) : (
        <table className="min-w-[400px] text-sm border border-gray-300 shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">Leave Type</th>
              <th className="border px-4 py-2 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(leaveData).map(([type, balance]) => (
              <tr key={type}>
                <td className="border px-4 py-2">{type}</td>
                <td className="border px-4 py-2">{balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateLeave employeeId={employeeId} />
    </div>
  
  );
};

export default Leave;
