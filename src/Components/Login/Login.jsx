// import React, { useState } from "react";
// import api from "../../api";
// import logo from "../../assets/flamingo-logo.png";
// import "./LoginPage.css";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [loggedIn, setLoggedIn] = useState(
//     !!localStorage.getItem("access_token")
//   );
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/api/method/fbts.api.auth.login", {
//         email_id: username,
//         password: password,
//       });

//       const userData = res.data.data[0];

//       localStorage.setItem("access_token", userData.access_token);
//       localStorage.setItem("employee_name", userData.full_name);
//       localStorage.setItem("employee_id", userData.employee_id);
//       localStorage.setItem("username", username);

//       setLoggedIn(true);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Login failed";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Redirect to dashboard if logged in
//   if (loggedIn) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return (
//     <div className="log-container">
//       <div className="log-left">
//         <div className="log-logo-wrapper">
//           <img src={logo} alt="Flamingo Logo" />
//         </div>
//       </div>

//       <div className="log-right">
//         <div className="log-form-box">
//           <h2>Login</h2>

//           <form onSubmit={handleLogin}>
//             {error && <div className="log-error-msg">{error}</div>}

//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="log-input-field"
//               required
//             />

//             <div className="log-password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="log-input-field"
//                 required
//               />
//               <button
//                 type="button"
//                 className="log-toggle-btn"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>

//             <div className="log-btn-flex">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="log-login-button"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </div>

//             <div className="log-links">
//              <Link to="/login/forgetpassword">  Reset Password </Link>
//              <Link to="/login/forgetpassword">  Forget Password </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// Login.js (Updated - fix navigation paths)
import React, { useState } from "react";
import api from "../../api";
import logo from "../../assets/flamingo-logo.png";
import "./LoginPage.css";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/method/fbts.api.auth.login", {
        email_id: username,
        password: password,
      });

      const userData = res.data.data[0];

      localStorage.setItem("access_token", userData.access_token);
      localStorage.setItem("employee_name", userData.full_name);
      localStorage.setItem("employee_id", userData.employee_id);
      localStorage.setItem("username", username);

      setLoggedIn(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to dashboard if logged in
  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="log-container">
      <div className="log-left">
        <div className="log-logo-wrapper">
          <img src={logo} alt="Flamingo Logo" />
        </div>
      </div>

      <div className="log-right">
        <div className="log-form-box">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            {error && <div className="log-error-msg">{error}</div>}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="log-input-field"
              required
            />

            <div className="log-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="log-input-field"
                required
              />
              <button
                type="button"
                className="log-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="log-btn-flex">
              <button
                type="submit"
                disabled={loading}
                className="log-login-button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="log-links">
              <Link to="/login/forgetpassword">Reset Password</Link>
              <Link to="/login/forgetpassword">Forget Password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;