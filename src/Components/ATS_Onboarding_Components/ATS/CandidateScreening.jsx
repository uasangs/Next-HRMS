import React, { useState } from "react";
import "./CandidateScreening.css";
import Header from "../../Header/Header";

const CandidateScreening = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Senior Software Engineer",
      experience: "6 years",
      skills: ["React", "Node.js", "AWS", "Docker"],
      education: "B.Tech Computer Science",
      matchScore: 92,
      status: "Pending Review",
      resumeUrl: "#",
      appliedDate: "2025-01-02"
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Product Manager",
      experience: "8 years",
      skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
      education: "MBA",
      matchScore: 88,
      status: "Shortlisted",
      resumeUrl: "#",
      appliedDate: "2024-12-28"
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "UI/UX Designer",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "Design Systems", "Prototyping"],
      education: "B.Des",
      matchScore: 75,
      status: "Pending Review",
      resumeUrl: "#",
      appliedDate: "2024-12-25"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      position: "Data Analyst",
      experience: "3 years",
      skills: ["Python", "SQL", "Tableau", "Statistics"],
      education: "M.Sc Statistics",
      matchScore: 68,
      status: "Pending Review",
      resumeUrl: "#",
      appliedDate: "2024-12-20"
    }
  ]);

  const handleScreening = (id, decision) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: decision === 'approve' ? 'Shortlisted' : 'Rejected' } : c
      )
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`);
  };

  const getScoreClass = (score) => {
    if (score >= 90) return 'score-90';
    if (score >= 80) return 'score-80';
    if (score >= 70) return 'score-70';
    return 'score-60';
  };

  return (
    <div className="screening-container">
      <Header />
      
      <div className="screening-content">
        <div className="screening-header">
          <div>
            <h1>AI-Powered Candidate Screening</h1>
            <p>Automated resume analysis and qualification matching</p>
          </div>
          <div className="header-actions">
            <button className="bulk-action-btn" onClick={() => handleBulkAction('shortlist')}>
              Bulk Shortlist
            </button>
            <button className="settings-btn">⚙️ Screening Criteria</button>
          </div>
        </div>

        <div className="screening-stats">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-number">{candidates.length}</div>
              <div className="stat-label">Total Candidates</div>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">{candidates.filter(c => c.status === 'Pending Review').length}</div>
              <div className="stat-label">Pending Review</div>
            </div>
          </div>
          <div className="stat-card shortlisted">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{candidates.filter(c => c.status === 'Shortlisted').length}</div>
              <div className="stat-label">Shortlisted</div>
            </div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-icon">✕</div>
            <div className="stat-info">
              <div className="stat-number">{candidates.filter(c => c.status === 'Rejected').length}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>
        </div>

        <div className="screening-filters">
          <select className="filter-select">
            <option>All Positions</option>
            <option>Senior Software Engineer</option>
            <option>Product Manager</option>
            <option>UI/UX Designer</option>
          </select>
          <select className="filter-select">
            <option>All Scores</option>
            <option>90%+</option>
            <option>80-89%</option>
            <option>70-79%</option>
            <option>Below 70%</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Pending Review</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <div className="card-header">
                <div className="candidate-info">
                  <h3>{candidate.name}</h3>
                  <p className="position">{candidate.position}</p>
                  <p className="applied-date">Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</p>
                </div>
                <div className={`match-score ${getScoreClass(candidate.matchScore)}`}>
                  <div className="score-number">{candidate.matchScore}%</div>
                  <div className="score-label">Match</div>
                </div>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="label">📚 Experience:</span>
                  <span className="value">{candidate.experience}</span>
                </div>
                <div className="info-row">
                  <span className="label">🎓 Education:</span>
                  <span className="value">{candidate.education}</span>
                </div>
                <div className="info-row skills-row">
                  <span className="label">💼 Skills:</span>
                  <div className="skills-tags">
                    {candidate.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <span className={`status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`}>
                  {candidate.status}
                </span>
                <div className="card-actions">
                  <button className="btn-view" title="View Resume">
                    👁️ View
                  </button>
                  {candidate.status === 'Pending Review' && (
                    <>
                      <button 
                        className="btn-approve"
                        onClick={() => handleScreening(candidate.id, 'approve')}
                        title="Shortlist Candidate"
                      >
                        ✓
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleScreening(candidate.id, 'reject')}
                        title="Reject Candidate"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {candidates.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No candidates to screen</h3>
            <p>Candidates will appear here when they apply for positions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateScreening;
