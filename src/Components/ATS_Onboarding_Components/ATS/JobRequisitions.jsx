import React, { useState } from "react";
import "./JobRequisitions.css";
import Header from "../../Header/Header";

const JobRequisitions = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [jobsList, setJobsList] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Mumbai",
      employmentType: "Full-time",
      experience: "5-8 years",
      positions: 2,
      status: "Active",
      postedDate: "2025-01-01",
      applications: 45
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      employmentType: "Full-time",
      experience: "6-10 years",
      positions: 1,
      status: "Active",
      postedDate: "2024-12-28",
      applications: 32
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Pune",
      employmentType: "Full-time",
      experience: "3-5 years",
      positions: 2,
      status: "On Hold",
      postedDate: "2024-12-25",
      applications: 28
    },
    {
      id: 4,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad",
      employmentType: "Contract",
      experience: "2-4 years",
      positions: 1,
      status: "Active",
      postedDate: "2024-12-20",
      applications: 19
    },
    {
      id: 5,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Delhi",
      employmentType: "Full-time",
      experience: "7-10 years",
      positions: 1,
      status: "Closed",
      postedDate: "2024-12-15",
      applications: 15
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    positions: 1,
    skills: "",
    description: "",
    qualifications: "",
    reportingTo: "",
    postingType: "External"
  });

  const [filterStatus, setFilterStatus] = useState("All");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newJob = {
      id: jobsList.length + 1,
      title: formData.title,
      department: formData.department,
      location: formData.location,
      employmentType: formData.employmentType,
      experience: formData.experience,
      positions: formData.positions,
      status: "Active",
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0
    };

    setJobsList(prev => [newJob, ...prev]);
    setShowCreateForm(false);
    
    // Reset form
    setFormData({
      title: "",
      department: "",
      location: "",
      employmentType: "Full-time",
      experience: "",
      salaryMin: "",
      salaryMax: "",
      positions: 1,
      skills: "",
      description: "",
      qualifications: "",
      reportingTo: "",
      postingType: "External"
    });
  };

  const filteredJobs = filterStatus === "All" 
    ? jobsList 
    : jobsList.filter(job => job.status === filterStatus);

  return (
    <div className="job-requisitions-container">
      <Header />
      
      <div className="job-requisitions-content">
        {/* Page Header */}
        <div className="page-header-section">
          <div>
            <h1>Job Requisitions</h1>
            <p>Manage your job openings and recruitment needs</p>
          </div>
          <button 
            className="create-job-btn"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <span className="btn-icon">➕</span>
            {showCreateForm ? "Cancel" : "Create New Job"}
          </button>
        </div>

        {/* Create Job Form */}
        {showCreateForm && (
          <div className="create-job-form-container">
            <div className="form-header">
              <h2>Create New Job Requisition</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-grid">
                {/* Basic Information */}
                <div className="form-section">
                  <h3>Basic Information</h3>
                  
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Mumbai, Bangalore"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Employment Type *</label>
                      <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Experience Required</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 3-5 years"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Number of Positions *</label>
                      <input
                        type="number"
                        name="positions"
                        value={formData.positions}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Reporting To</label>
                      <input
                        type="text"
                        name="reportingTo"
                        value={formData.reportingTo}
                        onChange={handleInputChange}
                        placeholder="Manager name or designation"
                      />
                    </div>
                  </div>
                </div>

                {/* Compensation */}
                <div className="form-section">
                  <h3>Compensation</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Salary Range (Min)</label>
                      <input
                        type="number"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        placeholder="Minimum salary"
                      />
                    </div>

                    <div className="form-group">
                      <label>Salary Range (Max)</label>
                      <input
                        type="number"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        placeholder="Maximum salary"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="form-section full-width">
                  <h3>Job Details</h3>
                  
                  <div className="form-group">
                    <label>Required Skills</label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="Enter required skills (comma separated)"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Detailed job description and responsibilities"
                      rows="5"
                    />
                  </div>

                  <div className="form-group">
                    <label>Qualifications</label>
                    <textarea
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      placeholder="Required qualifications and certifications"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Posting Type</label>
                    <select
                      name="postingType"
                      value={formData.postingType}
                      onChange={handleInputChange}
                    >
                      <option value="External">External</option>
                      <option value="Internal">Internal Only</option>
                      <option value="Both">Both Internal & External</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Job Requisition
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        {!showCreateForm && (
          <div className="jobs-list-container">
            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-group">
                <label>Filter by Status:</label>
                <div className="filter-buttons">
                  <button 
                    className={`filter-btn ${filterStatus === "All" ? "active" : ""}`}
                    onClick={() => setFilterStatus("All")}
                  >
                    All ({jobsList.length})
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === "Active" ? "active" : ""}`}
                    onClick={() => setFilterStatus("Active")}
                  >
                    Active ({jobsList.filter(j => j.status === "Active").length})
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === "On Hold" ? "active" : ""}`}
                    onClick={() => setFilterStatus("On Hold")}
                  >
                    On Hold ({jobsList.filter(j => j.status === "On Hold").length})
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === "Closed" ? "active" : ""}`}
                    onClick={() => setFilterStatus("Closed")}
                  >
                    Closed ({jobsList.filter(j => j.status === "Closed").length})
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="jobs-table-wrapper">
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Experience</th>
                    <th>Positions</th>
                    <th>Applications</th>
                    <th>Posted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td className="job-title-cell">{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>{job.employmentType}</td>
                        <td>{job.experience}</td>
                        <td className="text-center">{job.positions}</td>
                        <td className="text-center">
                          <span className="app-count-badge">{job.applications}</span>
                        </td>
                        <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`}>
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn view" title="View Details">👁️</button>
                            <button className="action-btn edit" title="Edit">✏️</button>
                            <button className="action-btn delete" title="Delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="no-data">
                        No job requisitions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRequisitions;
