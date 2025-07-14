import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Attendance from "./Attendance";
import Leave from "./Leave";
import Salary from "./Salary";
import ITComputation from "./ITComputation";
import Expenses from "./Expenses";

const App = () => {
  const token = localStorage.getItem("access_token");

  const ProtectedRoute = ({ element }) =>
    token ? element : <Navigate to="/login" replace />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
        <Route path="/leave" element={<ProtectedRoute element={<Leave />} />} />
        <Route path="/salary" element={<ProtectedRoute element={<Salary />} />} />
        <Route path="/it-computation" element={<ProtectedRoute element={<ITComputation />} />} />
        <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        
        {/* Catch all unmatched paths */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
