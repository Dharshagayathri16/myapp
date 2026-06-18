import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      adminId === "admin" &&
      password === "admin123"
    ) {

      alert("Admin Login Successful");

      navigate("/admin-dashboard");

    } else {

      alert("Invalid Admin Credentials");

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <div
        style={{
          backgroundColor: "#080275",
          color: "white",
          textAlign: "center",
          padding: "30px"
        }}
      >
        <h1>Medicine Stock Management System</h1>
        <h2>Admin Login</h2>
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <p>Admin ID</p>

        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <p>Password</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <button
          onClick={handleLogin}  
          style={{
            padding: "10px 20px",
            backgroundColor: "#080275",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            marginLeft: "10px"
          }}
        >
          Back
        </button>

      </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>

    </div>
  );
}

export default AdminLogin;