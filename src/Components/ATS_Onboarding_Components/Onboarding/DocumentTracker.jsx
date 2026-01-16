import React, { useState } from "react";
import "./DocumentTracker.css";
import Header from "../../Header/Header";

const DocumentTracker = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      empId: "EMP001",
      department: "Engineering",
      documents: [
        { name: "PAN Card", status: "Verified", uploadDate: "2025-01-02" },
        { name: "Aadhaar Card", status: "Verified", uploadDate: "2025-01-02" },
        { name: "Educational Certificates", status: "Verified", uploadDate: "2025-01-03" },
        { name: "Address Proof", status: "Pending", uploadDate: null },
        { name: "Passport Size Photos", status: "Uploaded", uploadDate: "2025-01-04" }
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      empId: "EMP002",
      department: "Product",
      documents: [
        { name: "PAN Card", status: "Verified", uploadDate: "2024-12-28" },
        { name: "Aadhaar Card", status: "Uploaded", uploadDate: "2024-12-28" },
        { name: "Educational Certificates", status: "Pending", uploadDate: null },
        { name: "Address Proof", status: "Pending", uploadDate: null },
        { name: "Passport Size Photos", status: "Verified", uploadDate: "2024-12-29" }
      ]
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return '#10b981';
      case 'Uploaded': return '#f59e0b';
      case 'Pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCompletionPercentage = (docs) => {
    const verified = docs.filter(d => d.status === 'Verified').length;
    return Math.round((verified / docs.length) * 100);
  };

  return (
    <div className="doc-tracker-container">
      <Header />
      
      <div className="doc-tracker-content">
        <div className="doc-page-header">
          <div>
            <h1>Document Tracker</h1>
            <p>Monitor and manage employee document collection</p>
          </div>
          <button className="upload-btn">
            <span className="btn-icon">📤</span>
            Upload Documents
          </button>
        </div>

        <div className="doc-stats">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <div className="stat-number">{employees.reduce((sum, e) => sum + e.documents.length, 0)}</div>
              <div className="stat-label">Total Documents</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">
                {employees.reduce((sum, e) => sum + e.documents.filter(d => d.status === 'Verified').length, 0)}
              </div>
              <div className="stat-label">Verified</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">
                {employees.reduce((sum, e) => sum + e.documents.filter(d => d.status === 'Pending').length, 0)}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>

        <div className="employees-grid">
          {employees.map((employee) => (
            <div key={employee.id} className="employee-doc-card">
              <div className="employee-header">
                <div className="employee-info">
                  <h3>{employee.name}</h3>
                  <p>{employee.empId} • {employee.department}</p>
                </div>
                <div className="completion-badge" style={{ '--color': getStatusColor(getCompletionPercentage(employee.documents) >= 80 ? 'Verified' : 'Uploaded') }}>
                  {getCompletionPercentage(employee.documents)}%
                </div>
              </div>

              <div className="documents-list">
                {employee.documents.map((doc, idx) => (
                  <div key={idx} className="document-item">
                    <div className="doc-name">
                      <span className="doc-icon">📄</span>
                      {doc.name}
                    </div>
                    <div className="doc-status">
                      <span className={`status-dot ${doc.status.toLowerCase()}`} style={{ background: getStatusColor(doc.status) }}></span>
                      <span className="status-text">{doc.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="view-docs-btn" onClick={() => setSelectedEmployee(employee)}>
                View All Documents →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentTracker;
