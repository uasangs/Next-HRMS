import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import './index.css';
import MainLayout from './Components/Layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<MainLayout />} /> {/* Use MainLayout for everything else */}
      </Routes>
    </Router>
  );
}

export default App;
