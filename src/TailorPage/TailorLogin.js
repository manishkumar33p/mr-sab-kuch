import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TailorLogin.css";

const TailorLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const staffUsers = [
    {
      email: "admin@niss.com",
      password: "12345",
      role: "admin",
    },
    {
      email: "staff1@niss.com",
      password: "12345",
      role: "staff",
    },
    {
      email: "staff2@niss.com",
      password: "12345",
      role: "staff",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = staffUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/bp");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>NISS Property Admin</h1>
        <p>Staff Login Panel</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TailorLogin;