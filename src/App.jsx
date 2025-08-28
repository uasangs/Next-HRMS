import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import "./index.css";
import MainLayout from "./Components/Layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* All dashboard routes */}
        <Route path="/dashboard/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

// App.js (or your main routing component)

