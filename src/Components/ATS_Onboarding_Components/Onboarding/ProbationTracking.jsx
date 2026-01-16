import React, { useState } from "react";
import "./ProbationTracking.css";
import Header from "../../Header/Header";

const ProbationTracking = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sneha Reddy",
      empId: "EMP003",
      department: "Analytics",
      joiningDate: "2024-10-01",
      probationPeriod: 90,
      daysCompleted: 95,
      status: "Due for Review",
      reviews: [
        { type: "30-Day Review", date: "2024-10-31", status: "Completed", rating: "Good" },
        { type: "60-Day Review", date: "2024-11-30", status: "Completed", rating: "Excellent" },
        { type: "Final Review", date: "2025-01-05", status: "Pending", rating: null }
      ]
    },
    {
      id: 2,
      name: "Vikram Singh",
      empId: "EMP004",
      department: "Sales",
      joiningDate: "2024-11-15",
      probationPeriod: 90,
      daysCompleted: 50,
      status: "On Track",
      reviews: [
        { type: "30-Day Review", date: "2024-12-15", status: "Completed", rating: "Good" },
        { type: "60-Day Review", date: "2025-01-15", status: "Scheduled", rating: null },
        { type: "Final Review", date: "2025-02-15", status: "Not Started", rating: null }
      ]
    }
  ]);

  const getProgressPercentage = (completed, total) => {
    return Math.min(Math.round((completed / total) * 100), 100);
  };

  return (
    <div className="probation-container">
      <Header />
      
      <div className="probation-content">
        <div className="probation-page-header">
          <div>
            <h1>Probation Tracking</h1>
            <p>Monitor employee probation periods and performance reviews</p>
          </div>
        </div>

        <div className="probation-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">{employees.length}</div>
              <div className="stat-label">In Probation</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <div className="stat-number">{employees.filter(e => e.status === 'Due for Review').length}</div>
              <div className="stat-label">Due for Review</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{employees.filter(e => e.status === 'On Track').length}</div>
              <div className="stat-label">On Track</div>
            </div>
          </div>
        </div>

        <div className="probation-grid">
          {employees.map((employee) => (
            <div key={employee.id} className="probation-card">
              <div className="probation-header">
                <div className="employee-info">
                  <h3>{employee.name}</h3>
                  <p>{employee.empId} • {employee.department}</p>
                  <p className="joining-date">Joined: {new Date(employee.joiningDate).toLocaleDateString()}</p>
                </div>
                <span className={`probation-status ${employee.status.toLowerCase().replace(' ', '-')}`}>
                  {employee.status}
                </span>
              </div>

              <div className="probation-progress">
                <div className="progress-info">
                  <span>Probation Progress</span>
                  <span>{employee.daysCompleted} / {employee.probationPeriod} days</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${getProgressPercentage(employee.daysCompleted, employee.probationPeriod)}%` }}
                  ></div>
                </div>
              </div>

              <div className="reviews-list">
                <h4>Performance Reviews</h4>
                {employee.reviews.map((review, idx) => (
                  <div key={idx} className="review-item">
                    <div className="review-info">
                      <span className="review-type">{review.type}</span>
                      <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="review-status-rating">
                      <span className={`review-status ${review.status.toLowerCase().replace(' ', '-')}`}>
                        {review.status}
                      </span>
                      {review.rating && (
                        <span className="review-rating">{review.rating}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="schedule-review-btn">Schedule Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProbationTracking;
