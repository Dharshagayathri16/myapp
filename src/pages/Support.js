import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Support() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    alert("Thank you for your feedback!");

    setName("");
    setEmail("");
    setMessage("");
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
        padding: "8px 16px",
        backgroundColor: "#0e0552",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      About
    </button>

  </div>
</div>

    <div
      style={{
        backgroundColor: "white",
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px"
      }}
    >

      <h2 style={{ color: "#1e3a5f" }}>
        Support & Feedback
      </h2>

      <p>
        If you have any issues, suggestions,
        or feedback regarding the system,
        please submit your message below.
      </p>

      <p><strong>Name:</strong></p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <p><strong>Email:</strong></p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <p><strong>Message:</strong></p>

      <textarea
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br />
      <br />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Submit Feedback
      </button>

    </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | Developed By <strong>Dharsha Gayathri G </strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
  </div>
);
}

export default Support;