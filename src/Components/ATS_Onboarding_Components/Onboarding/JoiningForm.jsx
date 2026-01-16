import React, { useState } from "react";
import "./JoiningForm.css";
import Header from "../../Header/Header";

const JoiningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    // Contact Details
    email: "",
    phone: "",
    alternatePhone: "",
    emergencyContact: "",
    emergencyRelation: "",
    // Address
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    // Statutory
    aadhaarNumber: "",
    pfUAN: "",
    esiNumber: "",
    // Previous Employment
    previousCompany: "",
    previousDesignation: "",
    previousCTC: "",
    lastWorkingDay: "",
    // Documents
    photo: null,
    resume: null,
    certificates: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Joining form submitted successfully!");
  };

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Contact & Address" },
    { number: 3, title: "Bank & Statutory" },
    { number: 4, title: "Previous Employment" },
    { number: 5, title: "Documents Upload" }
  ];

  return (
    <div className="joining-form-container">
      <Header />
      
      <div className="joining-form-content">
        <div className="form-page-header">
          <h1>Employee Joining Form</h1>
          <p>Please fill in all required information to complete your joining process</p>
        </div>

        {/* Progress Steps */}
        <div className="steps-container">
          {steps.map((step) => (
            <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}>
              <div className="step-number">{step.number}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Personal Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Marital Status *</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required>
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact & Address */}
            {currentStep === 2 && (
              <div className="form-step">
                <h2>Contact & Address Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Alternate Phone</label>
                    <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact *</label>
                    <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group full-width">
                    <label>Current Address *</label>
                    <textarea name="currentAddress" value={formData.currentAddress} onChange={handleInputChange} required rows="3"></textarea>
                  </div>
                  <div className="form-group full-width">
                    <label>Permanent Address *</label>
                    <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} required rows="3"></textarea>
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Bank & Statutory */}
            {currentStep === 3 && (
              <div className="form-step">
                <h2>Bank & Statutory Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Bank Name *</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Account Number *</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>IFSC Code *</label>
                    <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>PAN Number *</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Aadhaar Number *</label>
                    <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>PF UAN</label>
                    <input type="text" name="pfUAN" value={formData.pfUAN} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>ESI Number</label>
                    <input type="text" name="esiNumber" value={formData.esiNumber} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Previous Employment */}
            {currentStep === 4 && (
              <div className="form-step">
                <h2>Previous Employment Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Previous Company</label>
                    <input type="text" name="previousCompany" value={formData.previousCompany} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Designation</label>
                    <input type="text" name="previousDesignation" value={formData.previousDesignation} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Previous CTC</label>
                    <input type="text" name="previousCTC" value={formData.previousCTC} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Last Working Day</label>
                    <input type="date" name="lastWorkingDay" value={formData.lastWorkingDay} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Documents */}
            {currentStep === 5 && (
              <div className="form-step">
                <h2>Upload Documents</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Passport Size Photo *</label>
                    <input type="file" name="photo" onChange={handleInputChange} accept="image/*" required />
                  </div>
                  <div className="form-group full-width">
                    <label>Resume/CV *</label>
                    <input type="file" name="resume" onChange={handleInputChange} accept=".pdf,.doc,.docx" required />
                  </div>
                  <div className="form-group full-width">
                    <label>Educational Certificates *</label>
                    <input type="file" name="certificates" onChange={handleInputChange} accept=".pdf" required multiple />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn-previous" onClick={handlePrevious}>
                  ← Previous
                </button>
              )}
              {currentStep < 5 && (
                <button type="button" className="btn-next" onClick={handleNext}>
                  Next →
                </button>
              )}
              {currentStep === 5 && (
                <button type="submit" className="btn-submit">
                  Submit Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoiningForm;
