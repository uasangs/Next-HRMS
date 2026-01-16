import React, { useState } from "react";
import "./PreJoining.css";
import Header from "../../Header/Header";

const PreJoining = () => {
  const [newJoiners, setNewJoiners] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Senior Software Engineer",
      department: "Engineering",
      joiningDate: "2025-01-15",
      email: "rahul.sharma@email.com",
      phone: "+91 9876543210",
      checklistProgress: 65,
      status: "In Progress",
      tasks: {
        documents: { completed: 4, total: 6 },
        bgv: { completed: 1, total: 1 },
        assets: { completed: 2, total: 3 },
        access: { completed: 0, total: 2 }
      }
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Product Manager",
      department: "Product",
      joiningDate: "2025-01-20",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      checklistProgress: 40,
      status: "In Progress",
      tasks: {
        documents: { completed: 3, total: 6 },
        bgv: { completed: 0, total: 1 },
        assets: { completed: 1, total: 3 },
        access: { completed: 0, total: 2 }
      }
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "UI/UX Designer",
      department: "Design",
      joiningDate: "2025-01-10",
      email: "amit.kumar@email.com",
      phone: "+91 9876543212",
      checklistProgress: 90,
      status: "Almost Complete",
      tasks: {
        documents: { completed: 6, total: 6 },
        bgv: { completed: 1, total: 1 },
        assets: { completed: 3, total: 3 },
        access: { completed: 1, total: 2 }
      }
    }
  ]);

  const [selectedJoiner, setSelectedJoiner] = useState(null);

  const checklistItems = [
    { id: 1, category: "Documents", name: "PAN Card", status: "Completed" },
    { id: 2, category: "Documents", name: "Aadhaar Card", status: "Completed" },
    { id: 3, category: "Documents", name: "Educational Certificates", status: "Completed" },
    { id: 4, category: "Documents", name: "Previous Employment Proof", status: "Completed" },
    { id: 5, category: "Documents", name: "Address Proof", status: "Pending" },
    { id: 6, category: "Documents", name: "Passport Size Photos", status: "Pending" },
    { id: 7, category: "BGV", name: "Background Verification", status: "Completed" },
    { id: 8, category: "Assets", name: "Laptop Assignment", status: "Completed" },
    { id: 9, category: "Assets", name: "ID Card Request", status: "Completed" },
    { id: 10, category: "Assets", name: "Access Card", status: "Pending" },
    { id: 11, category: "Access", name: "Email Account Setup", status: "Pending" },
    { id: 12, category: "Access", name: "HRMS Access", status: "Pending" }
  ];

  const handleViewDetails = (joiner) => {
    setSelectedJoiner(joiner);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="prejoining-container">
      <Header />
      
      <div className="prejoining-content">
        {/* Page Header */}
        <div className="prejoining-header">
          <div>
            <h1>Pre-Joining Checklist</h1>
            <p>Track document collection and preparation before joining date</p>
          </div>
          <button className="add-joiner-btn">
            <span className="btn-icon">➕</span>
            Add New Joiner
          </button>
        </div>

        {/* Stats Overview */}
        <div className="prejoining-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">{newJoiners.length}</div>
              <div className="stat-label">Upcoming Joiners</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">
                {newJoiners.filter(j => j.checklistProgress >= 80).length}
              </div>
              <div className="stat-label">Ready to Join</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">
                {newJoiners.filter(j => j.checklistProgress < 50).length}
              </div>
              <div className="stat-label">Needs Attention</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <div className="stat-number">
                {newJoiners.reduce((sum, j) => sum + (j.tasks.documents.total - j.tasks.documents.completed), 0)}
              </div>
              <div className="stat-label">Pending Documents</div>
            </div>
          </div>
        </div>

        {/* Joiners List */}
        <div className="joiners-grid">
          {newJoiners.map((joiner) => (
            <div key={joiner.id} className="joiner-card">
              <div className="joiner-card-header">
                <div className="joiner-info">
                  <h3>{joiner.name}</h3>
                  <p className="joiner-position">{joiner.position}</p>
                  <p className="joiner-meta">
                    {joiner.department} • Joining: {new Date(joiner.joiningDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="progress-circle" style={{ '--progress': joiner.checklistProgress, '--color': getProgressColor(joiner.checklistProgress) }}>
                  <span>{joiner.checklistProgress}%</span>
                </div>
              </div>

              <div className="joiner-card-body">
                <div className="task-summary">
                  <div className="task-item">
                    <span className="task-label">📄 Documents</span>
                    <span className="task-count">{joiner.tasks.documents.completed}/{joiner.tasks.documents.total}</span>
                  </div>
                  <div className="task-item">
                    <span className="task-label">🔍 BGV</span>
                    <span className="task-count">{joiner.tasks.bgv.completed}/{joiner.tasks.bgv.total}</span>
                  </div>
                  <div className="task-item">
                    <span className="task-label">💼 Assets</span>
                    <span className="task-count">{joiner.tasks.assets.completed}/{joiner.tasks.assets.total}</span>
                  </div>
                  <div className="task-item">
                    <span className="task-label">🔐 Access</span>
                    <span className="task-count">{joiner.tasks.access.completed}/{joiner.tasks.access.total}</span>
                  </div>
                </div>

                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${joiner.checklistProgress}%`,
                      background: getProgressColor(joiner.checklistProgress)
                    }}
                  ></div>
                </div>
              </div>

              <div className="joiner-card-footer">
                <span className={`status-badge ${joiner.status.toLowerCase().replace(' ', '-')}`}>
                  {joiner.status}
                </span>
                <div className="card-actions">
                  <button className="btn-view" onClick={() => handleViewDetails(joiner)}>
                    View Checklist
                  </button>
                  <button className="btn-contact">
                    📧 Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Checklist Modal/Section */}
        {selectedJoiner && (
          <div className="checklist-detail-section">
            <div className="checklist-header">
              <h2>Pre-Joining Checklist - {selectedJoiner.name}</h2>
              <button className="close-btn" onClick={() => setSelectedJoiner(null)}>✕</button>
            </div>
            
            <div className="checklist-items">
              {checklistItems.map((item) => (
                <div key={item.id} className="checklist-item">
                  <div className="item-checkbox">
                    <input 
                      type="checkbox" 
                      checked={item.status === 'Completed'}
                      readOnly
                    />
                  </div>
                  <div className="item-details">
                    <span className="item-category">{item.category}</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className={`item-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreJoining;
