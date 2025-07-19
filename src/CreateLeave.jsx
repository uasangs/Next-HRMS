import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateLeave = ({ employeeId }) => {
  const [form, setForm] = useState({
    employee: employeeId || "",
    leave_type: "",
    from_date: "",
    to_date: "",
    description: ""
  });

  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    axios
      .get('https://fbts.flamingohrms.com/api/resource/Leave Type?fields=["name"]')
      .then((res) => setLeaveTypes(res.data.data))
      .catch((err) => {
        console.error("Error loading leave types:", err);
        setLeaveTypes([]);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.create_leave_application',
        {
          data: JSON.stringify(form)
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.message?.name) {
        alert(`Leave Application submitted! Doc: ${res.data.message.name}`);
      } else {
        alert(`Error: ${res.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Leave Application</h2>

      {/* Locked Employee Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
        <input
          name="employee"
          value={form.employee}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      {/* Leave Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
        <select
          name="leave_type"
          value={form.leave_type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value=""></option>
          {leaveTypes.map((lt) => (
            <option key={lt.name} value={lt.name}>
              {lt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            name="from_date"
            value={form.from_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            name="to_date"
            value={form.to_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Reason Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Leave Application
      </button>
    </div>
  );
};

export default CreateLeave;
