import { useNavigate } from "react-router-dom";

function About() {

  const navigate = useNavigate();

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

    <div
      style={{
        backgroundColor: "white",
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px"
      }}
    >

      <h2 style={{ color: "#1e3a5f" }}>
        About Medical Store Management System
      </h2>

      <p>
        The Medical Store Management System
        is a web-based application developed
        using React, Flask and MySQL.
      </p>

      <h3 style={{ color: "#1e3a5f" }}>
        Key Features
      </h3>

      <p>✅ Medicine Management</p>
      <p>✅ Batch Management</p>
      <p>✅ Expiry Tracking</p>
      <p>✅ Billing System</p>
      <p>✅ Stock Monitoring</p>
      <p>✅ Bill History</p>

      <hr />

      <p>
        Developed using React, Flask & MySQL
      </p>

    </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | Developed By <strong>Dharsha Gayathri G </strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
  </div>
);
}

export default About;