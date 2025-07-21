import React, { useState } from "react";
import "./LeaveRequest.css";
import Header from "../Header/Header";

const LeaveRequest = () => {
  const [leaveForms, setLeaveForms] = useState([
    {
      fromDate: "",
      toDate: "",
      leaveType: "",
      noOfDays: "",
      reason: "",
    },
  ]);

  const leaveBalances = {
    casual: 5,
    sick: 5,
    marriage: 10,
    privilege: 18,
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...leaveForms];
    updatedForms[index][name] = value;
    setLeaveForms(updatedForms);
  };

  const handleAddLeaveForm = () => {
    setLeaveForms([
      ...leaveForms,
      {
        fromDate: "",
        toDate: "",
        leaveType: "",
        noOfDays: "",
        reason: "",
      },
    ]);
  };

  const handleCancel = () => {
    setLeaveForms([
      {
        fromDate: "",
        toDate: "",
        leaveType: "",
        noOfDays: "",
        reason: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Leave Data:", leaveForms);
    alert("Leaves Submitted ✅\n" + JSON.stringify(leaveForms, null, 2));
  };

  return (
    <>
      <Header />
      <div className="Leave-request-container">
        <form onSubmit={handleSubmit} className="Leave-request-form">
          {leaveForms.map((form, index) => (
            <div key={index}>
              {/* Row 1 */}
              <div className="Leave-request-row-one-line">
                <div>
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={form.toDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label>Leave Type</label>
                  <select
                    name="leaveType"
                    value={form.leaveType}
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option value="">Select</option>
                    <option value="Half On Probation">Half On Probation</option>
                    <option value="On Probation">On Probation</option>
                    <option value="Compensatory Off">Compensatory Off</option>
                    <option value="Half Comp Off">Half Comp Off</option>
                    <option value="Half Outdoor Duty">Half Outdoor Duty</option>
                    <option value="Outdoor Duty">Outdoor Duty</option>
                    <option value="Half Day Work From Home">Half Day Work From Home</option>
                    <option value="Work From Home">Work From Home</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="Leave-request-row">
                <div>
                  <label>No of Days</label>
                  <input
                    type="number"
                    name="noOfDays"
                    value={form.noOfDays}
                    onChange={(e) => handleChange(index, e)}
                    min="1"
                  />
                </div>
                <div>
                  <label>Reason</label>
                  <input
                    type="text"
                    name="reason"
                    value={form.reason}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>

              {index !== leaveForms.length - 1 && <hr />}
            </div>
          ))}

          <div className="Leave-request-actions">
            <button
              type="button"
              onClick={handleAddLeaveForm}
              className="Leave-request-add-btn"
            >
              Add Leaves <span className="Leave-request-plus">+</span>
            </button>

            <div className="Leave-request-btns">
              <button
                type="button"
                onClick={handleCancel}
                className="Leave-request-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="Leave-request-submit">
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className="Leave-request-balance-boxes">
          <table className="Leave-request-box">
            <thead>
              <tr>
                <th>Leave</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Casual Leave</td>
                <td>{leaveBalances.casual}</td>
              </tr>
              <tr>
                <td>Sick Leave</td>
                <td>{leaveBalances.sick}</td>
              </tr>
              <tr>
                <td>Marriage Leaves</td>
                <td>{leaveBalances.marriage}</td>
              </tr>
              <tr>
                <td>Privilege Leaves</td>
                <td>{leaveBalances.privilege}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
