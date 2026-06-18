import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ textAlign: "center", padding: "20px 20px", backgroundColor: "#1b0992" }}>
        <h1 className="hero-title" style={{ fontSize: "2.5em", marginBottom: "85px", color: "#e7eaf2" }}>
          Medicine Stock Management System
        </h1>
        <p className="hero-subtitle" style={{ fontSize: "1.2em", color: "#c2c4d4" }}>
          Secure Store Login Portal
        </p>
      </div>

      {/* Page Header with Navigation Buttons */}
      <div className="page-header" style={{ padding: "20px", backgroundColor: "#f4f6f9" }}>
        <div
  className="nav-buttons"
  style={{
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>

  <div>
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

  <button
    className="main-btn"
    onClick={() => navigate("/admin-login")}
    style={{
      padding: "8px 16px",
      backgroundColor: "#0e0552",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Admin Login
  </button>

</div>
      </div>

      <div
        className="home-content"
        style={{
          textAlign: "center",
          marginTop: "10px"
        }}
      >
      <br/>
        <p
          style={{
            fontSize: "20px"
          }}
        >
          Welcome! Please Login or Register
        </p>

        <button
          className="home-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="home-btn"
          onClick={() => navigate("/register")}
          style={{ marginLeft: "10px" }}
        >
          Register
        </button>

      </div>
  <br/>
  <br/>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | Developed By <strong>Dharsha Gayathri G </strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>

  );
}

export default Home;