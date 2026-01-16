import React, { useState } from "react";
import "./SystemAccess.css";
import Header from "../../Header/Header";

const SystemAccess = () => {
  const [accessRequests, setAccessRequests] = useState([
    {
      id: 1,
      employeeName: "Rahul Sharma",
      empId: "EMP001",
      department: "Engineering",
      joiningDate: "2025-01-15",
      systems: [
        { name: "Email Account", status: "Active", createdDate: "2025-01-10" },
        { name: "HRMS Access", status: "Active", createdDate: "2025-01-10" },
        { name: "GitHub", status: "Active", createdDate: "2025-01-11" },
        { name: "Slack", status: "Active", createdDate: "2025-01-11" },
        { name: "VPN", status: "Pending", createdDate: null },
        { name: "Project Management Tool", status: "Pending", createdDate: null }
      ]
    },
    {
      id: 2,
      employeeName: "Priya Patel",
      empId: "EMP002",
      department: "Product",
      joiningDate: "2025-01-20",
      systems: [
        { name: "Email Account", status: "Pending", createdDate: null },
        { name: "HRMS Access", status: "Pending", createdDate: null },
        { name: "Confluence", status: "Pending", createdDate: null },
        { name: "Slack", status: "Pending", createdDate: null }
      ]
    }
  ]);

  const getAccessProgress = (systems) => {
    const active = systems.filter(s => s.status === 'Active').length;
    return Math.round((active / systems.length) * 100);
  };

  return (
    <div className="system-access-container">
      <Header />
      
      <div className="system-access-content">
        <div className="access-page-header">
          <div>
            <h1>System Access Provisioning</h1>
            <p>Manage IT system access for new employees</p>
          </div>
          <button className="create-access-btn">
            <span className="btn-icon">➕</span>
            Create New Access
          </button>
        </div>

        <div className="access-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">{accessRequests.length}</div>
              <div className="stat-label">Total Employees</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">
                {accessRequests.reduce((sum, e) => sum + e.systems.filter(s => s.status === 'Active').length, 0)}
              </div>
              <div className="stat-label">Active Systems</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">
                {accessRequests.reduce((sum, e) => sum + e.systems.filter(s => s.status === 'Pending').length, 0)}
              </div>
              <div className="stat-label">Pending Access</div>
            </div>
          </div>
        </div>

        <div className="access-grid">
          {accessRequests.map((request) => (
            <div key={request.id} className="access-card">
              <div className="access-header">
                <div className="employee-info">
                  <h3>{request.employeeName}</h3>
                  <p>{request.empId} • {request.department}</p>
                  <p className="joining-date">Joining: {new Date(request.joiningDate).toLocaleDateString()}</p>
                </div>
                <div className="access-progress">
                  <div className="progress-circle-small" style={{ '--progress': getAccessProgress(request.systems) }}>
                    {getAccessProgress(request.systems)}%
                  </div>
                </div>
              </div>

              <div className="systems-list">
                {request.systems.map((system, idx) => (
                  <div key={idx} className="system-item">
                    <div className="system-info">
                      <span className="system-icon">🔐</span>
                      <span className="system-name">{system.name}</span>
                    </div>
                    <span className={`system-status ${system.status.toLowerCase()}`}>
                      {system.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="provision-btn">Provision All Access</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemAccess;
