import React, { useState, useEffect } from "react";
import "./LeaveRequest.css";
import Header from "d:/HRMS/hrms/src/Components/Header/Header";
import axios from "axios";
import Notification  from  "../../assets/Notification.png";
import Queries  from  "../../assets/Queries.png";
import MyLeave from "./MyLeave";

const LeaveRequest = (employeeId) => {
  // const [form, setLeaveForms] = useState({
  //   employee: employeeId || "",
  //   leave_type: "",
  //   from_date: "",
  //   to_date: "",
  //   description: "",
  // });
  const [ setLeaveTypes] = useState([]);
  const leaveBalances = {
    casual: 5,
    sick: 5,
    marriage: 10,
    privilege: 18,
  };
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

  const [leaveForms, setLeaveForms] = useState([
    {
      fromDate: "",
      toDate: "",
      noOfDays: "",
      reason: "",
    },
  ]);
  const leaveTypes = [ ""
   ];
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

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.create_leave_application",
        {
          data: JSON.stringify(form),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.message?.name) {
        alert(`✅ Leave Application submitted!\nDoc: ${res.data.message.name}`);
      } else {
        alert(`⚠️ Error: ${res.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit application.");
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
      <Header />
      <MyLeave/>
      <div className="dashboard-header">
                   <h4>Employe Self Service</h4> 
                   <div className="top-right-icons">
                   <div> <p>FD00000</p></div> 
                     <div> <img src={Notification} alt="" /></div>  
                       <div> <img src={Queries} alt="" />  </div>
                   </div>
                  
                </div>
      <div className="Leave-request-container">
        <form onSubmit={handleSubmit} className="Leave-request-form">
          {leaveForms.map((form, index) => (
            <div key={index}>
              {/* Row 1 */}
              <div className="Leave-request-row-one-line">
                <div>
                  <label>From Date</label>
                  {/* <input
                   type="date"
                  //  name="from_date"
                   name="fromDate"
                   value={form.fromDate}
                   onChange={handleChange(index, e)}
                  /> */}
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
                    onChange={handleChange}
                    // className="peer w-full px-3 pt-6 pb-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" >
                      -- Select Leave Type --
                    </option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                    <option value="Work From Home">Work From Home</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Compensatory Off">Compensatory Off</option>
                    <option value="Half Day Leave">Half Day Leave</option>
                    <option value="Bereavement Leave">Bereavement Leave</option>

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
                    onChange={(e) => handleChange(index, e)}
                    readOnly // prevent manual typing if auto-calculated
                  />
                </div>
                <div>
                  <label>Reason</label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
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
              <button
                type="submit"
                className="Leave-request-submit"
                onClick={handleSubmit}
              >
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
