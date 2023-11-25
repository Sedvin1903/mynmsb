import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your custom styles
import useAuth from "../service/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Import isAuthenticated function

  const handleLogin = () => {
    // Replace with actual authentication logic
    if (username === "admin" && password === "admin@123") {
      localStorage.setItem("authenticated", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container mt-5">
      <div className="login-card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <br />
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleLogin}
            >
              Login
            </button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
