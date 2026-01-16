import React, { useState } from "react";
import "./CandidateDatabase.css";
import Header from "../../Header/Header";

const CandidateDatabase = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [candidatesList, setCandidatesList] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 9876543210",
      position: "Senior Software Engineer",
      experience: "6 years",
      skills: "React, Node.js, AWS",
      source: "LinkedIn",
      appliedDate: "2025-01-02",
      status: "Screening",
      rating: "A"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      position: "Product Manager",
      experience: "8 years",
      skills: "Product Strategy, Agile",
      source: "Referral",
      appliedDate: "2024-12-28",
      status: "Interview",
      rating: "A+"
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 9876543212",
      position: "UI/UX Designer",
      experience: "4 years",
      skills: "Figma, Adobe XD, Design Systems",
      source: "Career Portal",
      appliedDate: "2024-12-25",
      status: "Offer",
      rating: "B+"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 9876543213",
      position: "Data Analyst",
      experience: "3 years",
      skills: "Python, SQL, Tableau",
      source: "Job Board",
      appliedDate: "2024-12-20",
      status: "New",
      rating: "B"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 9876543214",
      position: "Marketing Manager",
      experience: "10 years",
      skills: "Digital Marketing, SEO, Analytics",
      source: "Agency",
      appliedDate: "2024-12-15",
      status: "Rejected",
      rating: "C"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");

  const filteredCandidates = candidatesList.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || candidate.status === filterStatus;
    const matchesSource = filterSource === "All" || candidate.source === filterSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const statusCounts = {
    all: candidatesList.length,
    new: candidatesList.filter(c => c.status === "New").length,
    screening: candidatesList.filter(c => c.status === "Screening").length,
    interview: candidatesList.filter(c => c.status === "Interview").length,
    offer: candidatesList.filter(c => c.status === "Offer").length,
    rejected: candidatesList.filter(c => c.status === "Rejected").length
  };

  return (
    <div className="candidate-database-container">
      <Header />
      
      <div className="candidate-database-content">
        {/* Page Header */}
        <div className="candidate-page-header">
          <div>
            <h1>Candidate Database</h1>
            <p>Manage and track all job applicants in one place</p>
          </div>
          <div className="header-actions">
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
              <span className="btn-icon">🔍</span>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button className="add-candidate-btn">
              <span className="btn-icon">➕</span>
              Add Candidate
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="candidate-stats-grid">
          <div className="candidate-stat-card">
            <div className="stat-number">{statusCounts.all}</div>
            <div className="stat-label">Total Candidates</div>
          </div>
          <div className="candidate-stat-card new">
            <div className="stat-number">{statusCounts.new}</div>
            <div className="stat-label">New Applications</div>
          </div>
          <div className="candidate-stat-card screening">
            <div className="stat-number">{statusCounts.screening}</div>
            <div className="stat-label">In Screening</div>
          </div>
          <div className="candidate-stat-card interview">
            <div className="stat-number">{statusCounts.interview}</div>
            <div className="stat-label">In Interview</div>
          </div>
          <div className="candidate-stat-card offer">
            <div className="stat-number">{statusCounts.offer}</div>
            <div className="stat-label">Offer Stage</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-filter-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search candidates by name, email, position, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Status:</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Source:</label>
                <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
                  <option value="All">All Sources</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Career Portal">Career Portal</option>
                  <option value="Referral">Referral</option>
                  <option value="Job Board">Job Board</option>
                  <option value="Agency">Agency</option>
                </select>
              </div>

              <button className="clear-filters-btn" onClick={() => {
                setFilterStatus("All");
                setFilterSource("All");
                setSearchTerm("");
              }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Candidates Table */}
        <div className="candidates-table-container">
          <div className="table-header">
            <h2>Candidates ({filteredCandidates.length})</h2>
            <div className="table-actions">
              <button className="export-btn">📥 Export</button>
              <button className="bulk-action-btn">✓ Bulk Actions</button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Candidate</th>
                  <th>Position Applied</th>
                  <th>Experience</th>
                  <th>Skills</th>
                  <th>Source</th>
                  <th>Applied Date</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div className="candidate-info">
                          <div className="candidate-name">{candidate.name}</div>
                          <div className="candidate-contact">
                            <span>{candidate.email}</span>
                            <span>{candidate.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="position-cell">{candidate.position}</td>
                      <td>{candidate.experience}</td>
                      <td>
                        <div className="skills-cell">{candidate.skills}</div>
                      </td>
                      <td>
                        <span className={`source-badge ${candidate.source.toLowerCase().replace(' ', '-')}`}>
                          {candidate.source}
                        </span>
                      </td>
                      <td>{new Date(candidate.appliedDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`rating-badge rating-${candidate.rating.toLowerCase().replace('+', 'plus')}`}>
                          {candidate.rating}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" title="View Profile">👁️</button>
                          <button className="action-btn download" title="Download Resume">📄</button>
                          <button className="action-btn schedule" title="Schedule Interview">📅</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      No candidates found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDatabase;
