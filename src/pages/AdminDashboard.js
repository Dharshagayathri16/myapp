import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [totalStores, setTotalStores] = useState(0);

  useEffect(() => {

    fetch("https://test-medibill-server.ramchintech.com/admin-total-stores")
      .then(res => res.json())
      .then(data => {
        setTotalStores(data.total_stores);
      })
      .catch(err => console.log(err));

  }, []);

  return (

    <div>

      <div className="hero-section">

        <h1 className="hero-title">
          Medicine Stock Management System
        </h1>

        <p className="hero-subtitle">
          Admin Dashboard
        </p>

      </div>

      <div className="admin-container">

        <h2 className="welcome-text">
          Welcome Admin 👋
        </h2>

        <div className="store-card">

          <h3>Total Stores</h3>

          <h1>{totalStores}</h1>

        </div>

        <div className="button-grid">

          <button
            className="admin-btn"
            onClick={() => navigate("/create-store")}
          >
            Create Store
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/view-stores")}
          >
            View Stores
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/edit-store")}
          >
            Edit Store
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/delete-store")}
          >
            Delete Store
          </button>

        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/")}
        >
          Logout
        </button>

      </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>

  );
}

export default AdminDashboard;