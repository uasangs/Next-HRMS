import React, { useState } from "react";
import "./InterviewScheduling.css";
import Header from "../../Header/Header";

const InterviewScheduling = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: "Rahul Sharma",
      position: "Senior Software Engineer",
      interviewType: "Technical Round",
      date: "2025-01-15",
      time: "10:00 AM",
      duration: "60 mins",
      interviewer: "Amit Patel",
      mode: "Video Call",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      position: "Product Manager",
      interviewType: "HR Round",
      date: "2025-01-15",
      time: "2:00 PM",
      duration: "45 mins",
      interviewer: "Sarah Khan",
      mode: "In-Person",
      status: "Scheduled",
      meetingLink: null
    },
    {
      id: 3,
      candidateName: "Amit Kumar",
      position: "UI/UX Designer",
      interviewType: "Design Review",
      date: "2025-01-16",
      time: "11:30 AM",
      duration: "90 mins",
      interviewer: "Neha Gupta",
      mode: "Video Call",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/xyz-abcd-efg"
    },
    {
      id: 4,
      candidateName: "Sneha Reddy",
      position: "Data Analyst",
      interviewType: "Technical Round",
      date: "2025-01-14",
      time: "3:00 PM",
      duration: "60 mins",
      interviewer: "Rajesh Kumar",
      mode: "Video Call",
      status: "Completed",
      meetingLink: "https://meet.google.com/pqr-stuv-wxy"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState("2025-01-15");
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const upcomingInterviews = interviews.filter(i => i.status === 'Scheduled');
  const todayInterviews = interviews.filter(i => i.date === new Date().toISOString().split('T')[0]);
  const completedInterviews = interviews.filter(i => i.status === 'Completed');

  const getInterviewsByDate = (date) => {
    return interviews.filter(i => i.date === date && i.status === 'Scheduled');
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'Video Call': return '📹';
      case 'In-Person': return '🏢';
      case 'Phone': return '📞';
      default: return '📅';
    }
  };

  return (
    <div className="interview-scheduling-container">
      <Header />
      
      <div className="interview-scheduling-content">
        {/* Page Header */}
        <div className="interview-page-header">
          <div>
            <h1>Interview Scheduling</h1>
            <p>Manage and track all candidate interviews</p>
          </div>
          <button className="schedule-interview-btn" onClick={() => setShowScheduleForm(true)}>
            <span className="btn-icon">➕</span>
            Schedule Interview
          </button>
        </div>

        {/* Stats Overview */}
        <div className="interview-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-number">{upcomingInterviews.length}</div>
              <div className="stat-label">Upcoming Interviews</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <div className="stat-number">{todayInterviews.length}</div>
              <div className="stat-label">Today's Interviews</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{completedInterviews.length}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="interview-main-grid">
          {/* Calendar/Date Selector */}
          <div className="calendar-section">
            <div className="section-header">
              <h2>Interview Calendar</h2>
            </div>
            
            <div className="date-selector">
              <button className="date-nav-btn">←</button>
              <div className="date-display">
                <span className="current-date">{new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <button className="date-nav-btn">→</button>
            </div>

            {/* Time Slots for Selected Date */}
            <div className="time-slots">
              {getInterviewsByDate(selectedDate).length > 0 ? (
                getInterviewsByDate(selectedDate).map((interview) => (
                  <div key={interview.id} className="time-slot-item">
                    <div className="slot-time">{interview.time}</div>
                    <div className="slot-details">
                      <div className="slot-candidate">{interview.candidateName}</div>
                      <div className="slot-type">{interview.interviewType}</div>
                      <div className="slot-meta">
                        <span>{getModeIcon(interview.mode)} {interview.mode}</span>
                        <span>⏱️ {interview.duration}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-interviews">
                  <span className="empty-icon">📅</span>
                  <p>No interviews scheduled for this date</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Interviews List */}
          <div className="interviews-list-section">
            <div className="section-header">
              <h2>Upcoming Interviews ({upcomingInterviews.length})</h2>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Video</button>
                <button className="filter-btn">In-Person</button>
              </div>
            </div>

            <div className="interviews-list">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="interview-card">
                  <div className="interview-card-header">
                    <div className="candidate-section">
                      <div className="candidate-avatar">
                        {interview.candidateName.charAt(0)}
                      </div>
                      <div className="candidate-details">
                        <h3>{interview.candidateName}</h3>
                        <p className="position">{interview.position}</p>
                      </div>
                    </div>
                    <span className={`mode-badge ${interview.mode.toLowerCase().replace(' ', '-')}`}>
                      {getModeIcon(interview.mode)} {interview.mode}
                    </span>
                  </div>

                  <div className="interview-card-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Type:</span>
                        <span className="info-value">{interview.interviewType}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Date:</span>
                        <span className="info-value">{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Time:</span>
                        <span className="info-value">{interview.time}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">{interview.duration}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Interviewer:</span>
                        <span className="info-value">{interview.interviewer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="interview-card-footer">
                    {interview.meetingLink && (
                      <button className="btn-join-meeting">
                        📹 Join Meeting
                      </button>
                    )}
                    <button className="btn-reschedule">Reschedule</button>
                    <button className="btn-cancel">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Form Modal */}
        {showScheduleForm && (
          <div className="schedule-form-modal">
            <div className="modal-overlay" onClick={() => setShowScheduleForm(false)}></div>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Schedule New Interview</h2>
                <button className="close-modal-btn" onClick={() => setShowScheduleForm(false)}>✕</button>
              </div>
              <form className="schedule-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Candidate Name</label>
                    <input type="text" placeholder="Enter candidate name" />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input type="text" placeholder="Enter position" />
                  </div>
                  <div className="form-group">
                    <label>Interview Type</label>
                    <select>
                      <option>Select type</option>
                      <option>HR Round</option>
                      <option>Technical Round</option>
                      <option>Design Review</option>
                      <option>Final Round</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Interview Mode</label>
                    <select>
                      <option>Select mode</option>
                      <option>Video Call</option>
                      <option>In-Person</option>
                      <option>Phone</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <select>
                      <option>30 mins</option>
                      <option>45 mins</option>
                      <option>60 mins</option>
                      <option>90 mins</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Interviewer</label>
                    <input type="text" placeholder="Enter interviewer name" />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel-form" onClick={() => setShowScheduleForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-form">
                    Schedule Interview
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewScheduling;
