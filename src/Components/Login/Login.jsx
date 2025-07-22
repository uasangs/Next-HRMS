import React, { useState } from "react";
import api from "../../api";
// import logo from "./assets/flamingo-logo.png";
import MainLayout from "../Layout/MainLayout";

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

  if (loggedIn) {
    return <MainLayout />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gradient-to-br from-[#1C2B83] to-[#1C2B83] flex flex-col justify-center items-center text-white p-10">
        {/* <img src={logo} alt="Flamingo Logo" className="h-20 mb-4" /> */}
        <h1 className="text-3xl font-bold tracking-wide">
          FLAMINGO<span className="text-pink-400 ml-1">Infinite</span>
        </h1>
        <p className="mt-2 text-sm tracking-widest uppercase text-gray-300">
          Empowering Growth
        </p>
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Welcome to Enterprise HRMS
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-800 hover:bg-indigo-900"
              } focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex justify-between text-sm text-gray-600">
              <a href="/reset-password" className="hover:text-indigo-600 hover:underline">
                Reset Password
              </a>
              <a href="/forgot-password" className="hover:text-indigo-600 hover:underline">
                Forget Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
