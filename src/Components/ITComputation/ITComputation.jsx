// import React, { useEffect, useState } from "react";
// import Notifications from "./Notifications";
// import axios from "axios";

// const ITComputation = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const username = localStorage.getItem("username"); // ✅ get saved email
//       if (!username) return;

//       try {
//         const res = await axios.get("https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.get_notifications", {
//           params: { to_user: username },
//         });
//         setNotifications(res.data.message || []);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <div className="p-8 text-xl">
//       <h2 className="mb-4 font-semibold">IT Computation Page</h2>
//       <Notifications notifications={notifications} />
//     </div>
//   );
// };

// export default ITComputation;


import React, { useState } from "react";
import "./ITComputation.css";
import Header from "../Header/Header";

const financialYears = ["2023-2024", "2024-2025", "2025-2026"];
const deductionsList = [
  { label: "80C (Investments)", max: 150000 },
  { label: "80D (Medical Insurance)", max: 50000 },
  { label: "HRA Exemption", max: 200000 },
];

const ITComputation = () => {
  const [financialYear, setFinancialYear] = useState(financialYears[1]);
  const [salary, setSalary] = useState(0);
  const [deductions, setDeductions] = useState({});
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [taxPayable, setTaxPayable] = useState(0);

  const handleDeductionChange = (key, value) => {
    const valid = Math.min(parseInt(value) || 0, deductionsList.find(d => d.label === key).max);
    setDeductions(prev => ({ ...prev, [key]: valid }));
  };

  const computeTax = () => {
    const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
    const taxable = Math.max(0, salary - totalDeductions);
    setTaxableIncome(taxable);

    let tax = 0;
    if (taxable <= 250000) tax = 0;
    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
    else tax = 112500 + (taxable - 1000000) * 0.3;

    setTaxPayable(tax);
  };

  return (
  <>
    <Header />
    <div className="itcomputation-wrapper">
      <div className="itcomputation-card">
        <h2>Income Tax Computation</h2>

        <div className="form-group">
          <label>Financial Year:</label>
          <select value={financialYear} onChange={e => setFinancialYear(e.target.value)}>
            {financialYears.map(yr => <option key={yr} value={yr}>{yr}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Annual Salary (INR):</label>
          <input
            type="number"
            value={salary}
            onChange={e => setSalary(parseInt(e.target.value) || 0)}
            placeholder="Enter total salary"
          />
        </div>

        <div className="form-group">
          <label>Deductions:</label>
          {deductionsList.map((deduction, idx) => (
            <div key={idx} className="deduction-row">
              <span>{deduction.label} (max ₹{deduction.max}):</span>
              <input
                type="number"
                placeholder="0"
                onChange={e => handleDeductionChange(deduction.label, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="action-group">
          <button onClick={computeTax}>Compute Tax</button>
        </div>

        <div className="result-section">
          <h3>Computation Summary</h3>
          <p><strong>Taxable Income:</strong> ₹{taxableIncome.toLocaleString()}</p>
          <p><strong>Tax Payable:</strong> ₹{taxPayable.toLocaleString()}</p>
        </div>
      </div>
    </div>
  </>
);

};

export default ITComputation;
