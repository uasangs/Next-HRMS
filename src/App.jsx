import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import "./index.css";
import MainLayout from "./Components/Layout/MainLayout";
import ForgetPassword from "./Components/Login/ForgetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* All dashboard routes */}
        <Route path="/dashboard/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

