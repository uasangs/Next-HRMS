
import React, { useState, useEffect } from "react";
import "./LeaveRequest.css";
import Header from "../Header/Header";
import axios from "axios";
import MyLeave from "./MyLeave";

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

  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://fbts.flamingohrms.com/api/resource/Leave Type?fields=["name"]'
      )
      .then((res) => setLeaveTypes(res.data.data))
      .catch((err) => {
        console.error("Error loading leave types:", err);
        setLeaveTypes([]);
      });
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...leaveForms];
    updatedForms[index][name] = value;

    // Auto-calculate number of days
    if (updatedForms[index].fromDate && updatedForms[index].toDate) {
      const from = new Date(updatedForms[index].fromDate);
      const to = new Date(updatedForms[index].toDate);
      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      updatedForms[index].noOfDays = diffDays > 0 ? diffDays : "";
    }

    setLeaveForms(updatedForms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeId = localStorage.getItem("employee_id");

    if (!employeeId) {
      alert("❌ Employee ID not found in localStorage.");
      return;
    }

    try {
      for (const form of leaveForms) {
        const payload = {
          employee: employeeId,
          leave_type: form.leaveType,
          from_date: form.fromDate,
          to_date: form.toDate,
          description: form.reason,
        };

        const res = await axios.post(
          "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.create_leave_application",
          { data: JSON.stringify(payload) }, // ✅ Frappe expects JSON string under "data"
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.message?.name) {
          alert(`✅ Leave submitted: ${res.data.message.name}`);
        } else {
          alert(`⚠️ Unexpected response: ${JSON.stringify(res.data)}`);
        }
      }
    } catch (err) {
      console.error("❌ Leave submission failed:", err);
      alert("❌ Failed to submit leave request.");
    }
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

  return (
    <>
      
      <MyLeave />
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
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes.map((lt) => (
                      <option key={lt.name} value={lt.name}>
                        {lt.name}
                      </option>
                    ))}
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
                    readOnly
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
      </div>
    </>
  );
};

export default LeaveRequest;
