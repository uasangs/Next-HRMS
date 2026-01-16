import React, { useState } from "react";
import "./OfferManagement.css";
import Header from "../../Header/Header";

const OfferManagement = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      candidateName: "Rahul Sharma",
      position: "Senior Software Engineer",
      department: "Engineering",
      offerDate: "2025-01-10",
      joiningDate: "2025-02-01",
      ctc: "₹18,00,000",
      baseSalary: "₹12,00,000",
      bonus: "₹2,00,000",
      status: "Accepted",
      validUntil: "2025-01-25"
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      position: "Product Manager",
      department: "Product",
      offerDate: "2025-01-12",
      joiningDate: "2025-02-05",
      ctc: "₹22,00,000",
      baseSalary: "₹15,00,000",
      bonus: "₹3,00,000",
      status: "Pending",
      validUntil: "2025-01-27"
    },
    {
      id: 3,
      candidateName: "Amit Kumar",
      position: "UI/UX Designer",
      department: "Design",
      offerDate: "2025-01-08",
      joiningDate: "2025-01-25",
      ctc: "₹14,00,000",
      baseSalary: "₹10,00,000",
      bonus: "₹1,50,000",
      status: "Sent",
      validUntil: "2025-01-23"
    },
    {
      id: 4,
      candidateName: "Sneha Reddy",
      position: "Data Analyst",
      department: "Analytics",
      offerDate: "2025-01-05",
      joiningDate: "2025-01-20",
      ctc: "₹12,00,000",
      baseSalary: "₹8,50,000",
      bonus: "₹1,00,000",
      status: "Rejected",
      validUntil: "2025-01-20"
    }
  ]);

  const [showOfferForm, setShowOfferForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const getStatusCounts = () => {
    return {
      total: offers.length,
      sent: offers.filter(o => o.status === 'Sent').length,
      accepted: offers.filter(o => o.status === 'Accepted').length,
      pending: offers.filter(o => o.status === 'Pending').length,
      rejected: offers.filter(o => o.status === 'Rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="offer-management-container">
      <Header />
      
      <div className="offer-management-content">
        {/* Page Header */}
        <div className="offer-page-header">
          <div>
            <h1>Offer Management</h1>
            <p>Create, track, and manage job offers</p>
          </div>
          <button className="create-offer-btn" onClick={() => setShowOfferForm(true)}>
            <span className="btn-icon">➕</span>
            Create Offer Letter
          </button>
        </div>

        {/* Stats Overview */}
        <div className="offer-stats">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <div className="stat-number">{statusCounts.total}</div>
              <div className="stat-label">Total Offers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📤</div>
            <div className="stat-info">
              <div className="stat-number">{statusCounts.sent}</div>
              <div className="stat-label">Offers Sent</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-number">{statusCounts.accepted}</div>
              <div className="stat-label">Accepted</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-number">{statusCounts.pending}</div>
              <div className="stat-label">Pending Response</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="offer-filters">
          <button className="filter-btn active">All Offers</button>
          <button className="filter-btn">Sent</button>
          <button className="filter-btn">Accepted</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Rejected</button>
        </div>

        {/* Offers Grid */}
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-card-header">
                <div className="candidate-section">
                  <div className="candidate-avatar-large">
                    {offer.candidateName.charAt(0)}
                  </div>
                  <div className="candidate-info">
                    <h3>{offer.candidateName}</h3>
                    <p className="position">{offer.position}</p>
                    <p className="department">{offer.department}</p>
                  </div>
                </div>
                <span className={`offer-status ${offer.status.toLowerCase()}`}>
                  {offer.status}
                </span>
              </div>

              <div className="offer-card-body">
                <div className="compensation-section">
                  <h4>Compensation Package</h4>
                  <div className="compensation-grid">
                    <div className="comp-item">
                      <span className="comp-label">Total CTC:</span>
                      <span className="comp-value ctc">{offer.ctc}</span>
                    </div>
                    <div className="comp-item">
                      <span className="comp-label">Base Salary:</span>
                      <span className="comp-value">{offer.baseSalary}</span>
                    </div>
                    <div className="comp-item">
                      <span className="comp-label">Bonus:</span>
                      <span className="comp-value">{offer.bonus}</span>
                    </div>
                  </div>
                </div>

                <div className="dates-section">
                  <div className="date-item">
                    <span className="date-label">📅 Offer Date:</span>
                    <span className="date-value">{new Date(offer.offerDate).toLocaleDateString()}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">🚀 Joining Date:</span>
                    <span className="date-value">{new Date(offer.joiningDate).toLocaleDateString()}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">⏰ Valid Until:</span>
                    <span className="date-value">{new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="offer-card-footer">
                <button className="btn-view-offer" onClick={() => setSelectedOffer(offer)}>
                  👁️ View Offer
                </button>
                <button className="btn-download">
                  📥 Download
                </button>
                {offer.status === 'Sent' && (
                  <button className="btn-remind">
                    🔔 Send Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Create Offer Form Modal */}
        {showOfferForm && (
          <div className="offer-form-modal">
            <div className="modal-overlay" onClick={() => setShowOfferForm(false)}></div>
            <div className="modal-content-large">
              <div className="modal-header">
                <h2>Create Offer Letter</h2>
                <button className="close-modal-btn" onClick={() => setShowOfferForm(false)}>✕</button>
              </div>
              <form className="offer-form">
                <div className="form-section">
                  <h3>Candidate Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Candidate Name *</label>
                      <input type="text" placeholder="Enter candidate name" required />
                    </div>
                    <div className="form-group">
                      <label>Position *</label>
                      <input type="text" placeholder="Enter position" required />
                    </div>
                    <div className="form-group">
                      <label>Department *</label>
                      <select required>
                        <option value="">Select department</option>
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Design</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Compensation Details</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Total CTC *</label>
                      <input type="text" placeholder="₹0" required />
                    </div>
                    <div className="form-group">
                      <label>Base Salary *</label>
                      <input type="text" placeholder="₹0" required />
                    </div>
                    <div className="form-group">
                      <label>Variable/Bonus</label>
                      <input type="text" placeholder="₹0" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Timeline</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Joining Date *</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Offer Valid Until *</label>
                      <input type="date" required />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel-form" onClick={() => setShowOfferForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-form">
                    Generate Offer Letter
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

export default OfferManagement;
