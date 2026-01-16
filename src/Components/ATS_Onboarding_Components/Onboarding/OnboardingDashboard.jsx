import React, { useState } from "react";
import "./OnboardingDashboard.css";
import Header from "../../Header/Header";

const OnboardingDashboard = () => {
  const [stats, setStats] = useState({
    activeOnboarding: 5,
    pendingDocuments: 12,
    systemAccessPending: 8,
    probationDue: 3,
    preJoining: 4,
    firstDay: 2,
    inProbation: 15,
    exitProcessing: 1
  });

  const [recentJoinings, setRecentJoinings] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Senior Software Engineer",
      department: "Engineering",
      joiningDate: "2025-01-15",
      status: "Pre-Joining",
      progress: 60
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Product Manager",
      department: "Product",
      joiningDate: "2025-01-20",
      status: "Pre-Joining",
      progress: 40
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "UI/UX Designer",
      department: "Design",
      joiningDate: "2025-01-10",
      status: "First Day",
      progress: 85
    },
    {
      id: 4,
      name: "Sneha Reddy",
      position: "Data Analyst",
      department: "Analytics",
      joiningDate: "2024-12-01",
      status: "In Probation",
      progress: 100
    }
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, task: "Collect PAN card copy", employee: "Rahul Sharma", dueDate: "2025-01-10", priority: "High" },
    { id: 2, task: "Setup email account", employee: "Priya Patel", dueDate: "2025-01-18", priority: "High" },
    { id: 3, task: "Complete BGV", employee: "Amit Kumar", dueDate: "2025-01-08", priority: "Critical" },
    { id: 4, task: "Schedule probation review", employee: "Sneha Reddy", dueDate: "2025-01-20", priority: "Medium" },
    { id: 5, task: "Laptop assignment", employee: "Rahul Sharma", dueDate: "2025-01-14", priority: "High" }
  ]);

  const [upcomingReviews, setUpcomingReviews] = useState([
    { id: 1, employee: "Sneha Reddy", type: "30-Day Review", date: "2025-01-05" },
    { id: 2, employee: "Vikram Singh", type: "60-Day Review", date: "2025-01-12" },
    { id: 3, employee: "Anjali Gupta", type: "Final Review", date: "2025-01-25" }
  ]);

  return (
    <div className="onboarding-dashboard-container">
      <Header />
      
      <div className="onboarding-dashboard-content">
        {/* Page Header */}
        <div className="onboard-page-header">
          <h1>On-boarding Dashboard</h1>
          <p>Manage employee joining, probation, and exit processes</p>
        </div>

        {/* Stats Cards */}
        <div className="onboard-stats-grid">
          <div className="onboard-stat-card primary">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <h3>{stats.activeOnboarding}</h3>
              <p>Active On-boarding</p>
            </div>
          </div>

          <div className="onboard-stat-card warning">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <h3>{stats.pendingDocuments}</h3>
              <p>Pending Documents</p>
            </div>
          </div>

          <div className="onboard-stat-card info">
            <div className="stat-icon">🔐</div>
            <div className="stat-info">
              <h3>{stats.systemAccessPending}</h3>
              <p>System Access Pending</p>
            </div>
          </div>

          <div className="onboard-stat-card danger">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <h3>{stats.probationDue}</h3>
              <p>Probation Reviews Due</p>
            </div>
          </div>
        </div>

        {/* Process Status */}
        <div className="process-status-grid">
          <div className="onboard-widget">
            <div className="widget-header">
              <h2>On-boarding Pipeline</h2>
            </div>
            <div className="pipeline-stages">
              <div className="stage-item">
                <div className="stage-count primary">{stats.preJoining}</div>
                <div className="stage-label">Pre-Joining</div>
              </div>
              <div className="stage-arrow">→</div>
              <div className="stage-item">
                <div className="stage-count success">{stats.firstDay}</div>
                <div className="stage-label">First Day</div>
              </div>
              <div className="stage-arrow">→</div>
              <div className="stage-item">
                <div className="stage-count warning">{stats.inProbation}</div>
                <div className="stage-label">In Probation</div>
              </div>
              <div className="stage-arrow">→</div>
              <div className="stage-item">
                <div className="stage-count info">{stats.exitProcessing}</div>
                <div className="stage-label">Exit Process</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="onboard-content-grid">
          {/* Recent Joinings */}
          <div className="onboard-widget">
            <div className="widget-header">
              <h2>Recent Joinings</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="joinings-list">
              {recentJoinings.map((joining) => (
                <div key={joining.id} className="joining-card">
                  <div className="joining-info">
                    <div className="employee-name">{joining.name}</div>
                    <div className="employee-position">{joining.position}</div>
                    <div className="employee-meta">
                      <span>{joining.department}</span>
                      <span>•</span>
                      <span>{new Date(joining.joiningDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="joining-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${joining.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{joining.progress}% Complete</span>
                  </div>
                  <span className={`status-badge ${joining.status.toLowerCase().replace(' ', '-')}`}>
                    {joining.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="onboard-widget">
            <div className="widget-header">
              <h2>Pending Tasks</h2>
            </div>
            <div className="tasks-list">
              {pendingTasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-checkbox">
                    <input type="checkbox" id={`task-${task.id}`} />
                  </div>
                  <div className="task-details">
                    <div className="task-title">{task.task}</div>
                    <div className="task-meta">
                      {task.employee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="onboard-widget">
          <div className="widget-header">
            <h2>Upcoming Probation Reviews</h2>
          </div>
          <div className="reviews-table-container">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Review Type</th>
                  <th>Scheduled Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingReviews.map((review) => (
                  <tr key={review.id}>
                    <td className="employee-cell">{review.employee}</td>
                    <td>{review.type}</td>
                    <td>{new Date(review.date).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn schedule">Schedule</button>
                        <button className="action-btn view">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="onboard-quick-actions">
          <button className="quick-action-btn primary">
            <span className="btn-icon">➕</span>
            Add New Joinee
          </button>
          <button className="quick-action-btn secondary">
            <span className="btn-icon">📋</span>
            Pre-Joining Checklist
          </button>
          <button className="quick-action-btn tertiary">
            <span className="btn-icon">📊</span>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDashboard;
