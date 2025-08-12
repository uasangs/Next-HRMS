// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Login/Login';
// import './index.css';
// import MainLayout from './Components/Layout/MainLayout';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/*" element={<MainLayout />} /> {/* Use MainLayout for everything else */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import './index.css';
import MainLayout from './Components/Layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect / to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* All other routes handled by MainLayout */}
        <Route path="/dashboard/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
