import React, { useState } from "react";
import "./ExitManagement.css";
import Header from "../../Header/Header";

const ExitManagement = () => {
  const [exitRequests, setExitRequests] = useState([
    {
      id: 1,
      employeeName: "Anjali Gupta",
      empId: "EMP005",
      department: "Marketing",
      designation: "Marketing Executive",
      resignationDate: "2024-12-20",
      lastWorkingDay: "2025-01-19",
      noticePeriod: "30 days",
      reason: "Better Opportunity",
      status: "In Process",
      clearanceProgress: 60,
      clearances: [
        { dept: "IT", status: "Completed", date: "2025-01-05" },
        { dept: "Admin", status: "Completed", date: "2025-01-06" },
        { dept: "HR", status: "Pending", date: null },
        { dept: "Finance", status: "Pending", date: null }
      ]
    }
  ]);

  const getClearancePercentage = (clearances) => {
    const completed = clearances.filter(c => c.status === 'Completed').length;
    return Math.round((completed / clearances.length) * 100);
  };

  return (
    <div className="exit-container">
      <Header />
      
      <div className="exit-content">
        <div className="exit-page-header">
          <div>
            <h1>Exit & Off-boarding Management</h1>
            <p>Manage employee resignations and clearance process</p>
          </div>
          <button className="initiate-exit-btn">
            <span className="btn-icon">➕</span>
            Initiate Exit Process
          </button>
        </div>

        <div className="exit-stats">
          <div className="stat-card">
            <div className="stat-icon">📤</div>
            <div className="stat-info">
              <div className="stat-number">{exitRequests.length}</div>
              <div className="stat-label">Active Exits</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">{exitRequests.filter(e => e.status === 'In Process').length}</div>
              <div className="stat-label">In Process</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{exitRequests.filter(e => e.status === 'Completed').length}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        <div className="exit-grid">
          {exitRequests.map((exit) => (
            <div key={exit.id} className="exit-card">
              <div className="exit-header">
                <div className="employee-info">
                  <h3>{exit.employeeName}</h3>
                  <p>{exit.empId} • {exit.designation}</p>
                  <p className="dept-info">{exit.department}</p>
                </div>
                <span className={`exit-status ${exit.status.toLowerCase().replace(' ', '-')}`}>
                  {exit.status}
                </span>
              </div>

              <div className="exit-details">
                <div className="detail-row">
                  <span className="label">Resignation Date:</span>
                  <span className="value">{new Date(exit.resignationDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Last Working Day:</span>
                  <span className="value">{new Date(exit.lastWorkingDay).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Notice Period:</span>
                  <span className="value">{exit.noticePeriod}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Reason:</span>
                  <span className="value">{exit.reason}</span>
                </div>
              </div>

              <div className="clearance-section">
                <h4>Clearance Progress ({getClearancePercentage(exit.clearances)}%)</h4>
                <div className="clearances-list">
                  {exit.clearances.map((clearance, idx) => (
                    <div key={idx} className="clearance-item">
                      <span className="clearance-dept">{clearance.dept}</span>
                      <span className={`clearance-status ${clearance.status.toLowerCase()}`}>
                        {clearance.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="exit-actions">
                <button className="btn-interview">Exit Interview</button>
                <button className="btn-fnf">F&F Settlement</button>
                <button className="btn-certificate">Experience Letter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExitManagement;
