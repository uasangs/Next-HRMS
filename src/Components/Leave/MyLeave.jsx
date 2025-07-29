import React from 'react';
import './MyLeave.css';

const MyLeave = ({ leaveData }) => {
  // Default data if none provided
  const defaultLeaveData = [
    { type: 'Casual Leaves', balance: 5 },
    { type: 'Sick Leaves', balance: 5 },
    { type: 'Marriage Leaves', balance: 10 },
    { type: 'Privilege Leaves', balance: 18 }
  ];

  const leaves = leaveData || defaultLeaveData;

  return (
    <div className="leave-balance-container">
      <h2 className="leave-balance-title">Leave Balance</h2>
      
      <div className="leave-balance-items">
        {leaves.map((leave, index) => (
          <div key={index} className="leave-balance-item">
            <span className="leave-type">{leave.type}</span>
            <span className="leave-count">{leave.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLeave;