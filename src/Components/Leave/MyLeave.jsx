import React, { useState, useEffect } from 'react';
import './MyLeave.css';
import { fetchLeaveBalance } from '../Home/dashboardApi';
import Header from '../Header/Header';

const MyLeave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const employeeId = localStorage.getItem('employee_id');
    if (!employeeId) {
      console.error("❌ Employee ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const loadLeaves = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaveBalance(employeeId);
        console.log("✅ Leave Balance Response:", data);

        // Convert object to array
        const converted = Object.entries(data).map(([type, total]) => ({
          leave_type: type,
          total: total,
        }));

        setLeaveData(converted);
      } catch (error) {
        console.error("❌ Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, []);

  return (
    <>
   <Header/>
    <div className="leave-balance-container">
      <h2 className="leave-balance-title">Leave Balance</h2>

      {loading ? (
        <div className="loading">Loading leave balances...</div>
      ) : leaveData.length > 0 ? (
        <div className="leave-balance-items">
          {leaveData.map((leave, index) => (
            <div key={index} className="leave-balance-item">
              <span className="leave-type">{leave.leave_type}</span>
              <span className="leave-count">{leave.total}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-records">No leave data available</div>
      )}
    </div>
     </>
  );
};

export default MyLeave;
