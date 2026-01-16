import React, { useState, useEffect } from "react";
import "./ATSDashboard.css";
import Header from "../../Header/Header";

const ATSDashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 12,
    totalCandidates: 156,
    pendingInterviews: 8,
    offersExtended: 5,
    newApplications: 23,
    screening: 34,
    interviewed: 45,
    rejected: 28
  });

  const [recentJobs, setRecentJobs] = useState([
    { id: 1, title: "Senior Software Engineer", department: "Engineering", applications: 45, status: "Active" },
    { id: 2, title: "Product Manager", department: "Product", applications: 32, status: "Active" },
    { id: 3, title: "UI/UX Designer", department: "Design", applications: 28, status: "Active" },
    { id: 4, title: "Data Analyst", department: "Analytics", applications: 19, status: "Active" },
    { id: 5, title: "Marketing Manager", department: "Marketing", applications: 15, status: "On Hold" }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "New application received", candidate: "John Doe", position: "Senior Software Engineer", time: "2 hours ago" },
    { id: 2, action: "Interview scheduled", candidate: "Jane Smith", position: "Product Manager", time: "4 hours ago" },
    { id: 3, action: "Offer extended", candidate: "Mike Johnson", position: "UI/UX Designer", time: "1 day ago" },
    { id: 4, action: "Candidate screened", candidate: "Sarah Williams", position: "Data Analyst", time: "1 day ago" },
    { id: 5, action: "Interview completed", candidate: "Tom Brown", position: "Marketing Manager", time: "2 days ago" }
  ]);

  const [hiringFunnel, setHiringFunnel] = useState([
    { stage: "Applications", count: 156, percentage: 100 },
    { stage: "Screening", count: 89, percentage: 57 },
    { stage: "Interview", count: 45, percentage: 29 },
    { stage: "Offer", count: 12, percentage: 8 },
    { stage: "Hired", count: 5, percentage: 3 }
  ]);

  return (
    <div className="ats-dashboard-container">
      <Header />
      
      <div className="ats-dashboard-content">
        {/* Page Header */}
        <div className="ats-page-header">
          <h1>Recruitment Dashboard</h1>
          <p>Overview of your hiring pipeline and recruitment metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="ats-stats-grid">
          <div className="ats-stat-card primary">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{stats.activeJobs}</h3>
              <p>Active Job Openings</p>
            </div>
          </div>

          <div className="ats-stat-card success">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalCandidates}</h3>
              <p>Total Candidates</p>
            </div>
          </div>

          <div className="ats-stat-card warning">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.pendingInterviews}</h3>
              <p>Pending Interviews</p>
            </div>
          </div>

          <div className="ats-stat-card info">
            <div className="stat-icon">✉️</div>
            <div className="stat-info">
              <h3>{stats.offersExtended}</h3>
              <p>Offers Extended</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="ats-main-grid">
          {/* Hiring Funnel */}
          <div className="ats-widget">
            <div className="widget-header">
              <h2>Hiring Funnel</h2>
            </div>
            <div className="funnel-chart">
              {hiringFunnel.map((stage, index) => (
                <div key={index} className="funnel-stage">
                  <div className="funnel-bar-container">
                    <div 
                      className="funnel-bar" 
                      style={{ width: `${stage.percentage}%` }}
                    >
                      <span className="funnel-label">{stage.stage}</span>
                      <span className="funnel-count">{stage.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Status */}
          <div className="ats-widget">
            <div className="widget-header">
              <h2>Pipeline Status</h2>
            </div>
            <div className="pipeline-stats">
              <div className="pipeline-stat">
                <div className="stat-label">New Applications</div>
                <div className="stat-value new">{stats.newApplications}</div>
              </div>
              <div className="pipeline-stat">
                <div className="stat-label">In Screening</div>
                <div className="stat-value screening">{stats.screening}</div>
              </div>
              <div className="pipeline-stat">
                <div className="stat-label">Interviewed</div>
                <div className="stat-value interviewed">{stats.interviewed}</div>
              </div>
              <div className="pipeline-stat">
                <div className="stat-label">Rejected</div>
                <div className="stat-value rejected">{stats.rejected}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs & Activity */}
        <div className="ats-content-grid">
          {/* Recent Job Openings */}
          <div className="ats-widget">
            <div className="widget-header">
              <h2>Recent Job Openings</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="jobs-table-container">
              <table className="ats-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Applications</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="job-title">{job.title}</td>
                      <td>{job.department}</td>
                      <td>
                        <span className="application-count">{job.applications}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="ats-widget">
            <div className="widget-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.action.includes('application') && '📝'}
                    {activity.action.includes('Interview') && '📅'}
                    {activity.action.includes('Offer') && '✉️'}
                    {activity.action.includes('screened') && '🔍'}
                  </div>
                  <div className="activity-details">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-info">
                      <span className="candidate-name">{activity.candidate}</span> - {activity.position}
                    </div>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="ats-quick-actions">
          <button className="quick-action-btn primary">
            <span className="btn-icon">➕</span>
            Create Job Requisition
          </button>
          <button className="quick-action-btn secondary">
            <span className="btn-icon">📊</span>
            View Analytics
          </button>
          <button className="quick-action-btn tertiary">
            <span className="btn-icon">📥</span>
            Import Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATSDashboard;
