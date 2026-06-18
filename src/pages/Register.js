import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
const [storeName, setStoreName] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async () => {
try 
{
const response = await fetch(
"http://127.0.0.1:5000/register",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
store_name: storeName,
password: password,
}),
}
);

const data = await response.text();

alert(data);

if (data === "Registration Successful") {
  setStoreName("");
  setPassword("");
}


} catch (error) {
console.log("Error:", error);
alert("Server Error");
}
};

return ( 
<div>
      {/* Hero Section */}
      <div className="hero-section" style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#1b0992" }}>
        <h1 className="hero-title" style={{ fontSize: "2.5em", marginBottom: "10px", color: "#e7eaf2" }}>
          Medicine Stock Management System
        </h1>
        <p className="hero-subtitle" style={{ fontSize: "1.2em", color: "#c2c4d4" }}>
          Secure Store Login Portal
        </p>
      </div>

      {/* Page Header with Navigation Buttons */}
<div className="page-header" style={{ padding: "20px", backgroundColor: "#f4f6f9" }}>
  <div className="nav-buttons" style={{ marginTop: "10px" }}>

    <button
      className="main-btn"
      onClick={() => navigate("/")}
      style={{
        marginRight: "10px",
        padding: "8px 16px",
        backgroundColor: "#080275",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Home
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/about")}
      style={{
        marginRight: "10px",
        padding: "8px 16px",
        backgroundColor: "#080275",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      About
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/support")}
      style={{
        padding: "8px 16px",
        backgroundColor: "#0e0552",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Support
    </button>

  </div>
</div>

  {/* Register Card */}

  <div
    className="card-box"
    style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#1e3a5f"
      }}
    >
      Store Register
    </h2>

    <input
      type="text"
      placeholder="Store Name"
      value={storeName}
      onChange={(e) => setStoreName(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    />

    <button
      onClick={handleRegister}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#031c4c",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Register
    </button>

    <br /><br />

    <button
      onClick={() => navigate("/login")}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#031c4c",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Go To Login
    </button>

  </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>

</div>

);
}

export default Register;
