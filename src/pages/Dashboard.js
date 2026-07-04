import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // State for dashboard data
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStockMedicines, setLowStockMedicines] = useState(0);
  const [outOfStockMedicines, setOutOfStockMedicines] = useState(0);
  const [expiredMedicines, setExpiredMedicines] = useState(0);

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Later get this from login
  const storeName = localStorage.getItem("store_name") || "Medical Store";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const storeId = localStorage.getItem("store_id");
      const response = await fetch(`https://test-medibill-server.ramchintech.com/dashboard/${storeId}`);
      const data = await response.json();

      setTotalMedicines(data.total_medicines);
      setLowStockMedicines(data.low_stock_medicines);
      setOutOfStockMedicines(data.out_of_stock_medicines);
      setExpiredMedicines(data.expired_medicines);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("store_name");
    localStorage.removeItem("store_id");
    navigate("/");
  };

  return (
    <div>
      {/* Hero Section */}
<div
  className="hero-section"
  style={{
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#1b0992"
  }}
>
  <h1
    style={{
      fontSize: "2.5em",
      marginBottom: "10px",
      color: "#e7eaf2"
    }}
  >
    Medicine Stock Management System
  </h1>

  <p
    style={{
      fontSize: "1.2em",
      color: "#c2c4d4"
    }}
  >
    Dashboard Portal
  </p>
</div>

{/* Navigation Bar */}
<div
  style={{
    backgroundColor: "#f4f6f9",
    padding: "15px"
  }}
>

  {/* Mobile Menu Button */}
  <button
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

  {/* Desktop Menu */}
  <div className="desktop-menu">

    <button
      className="main-btn"
      onClick={() => navigate("/add-medicine")}
    >
      Add Medicine
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/view-medicines")}
    >
      View Medicines
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/profile")}
    >
      Profile
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/add-batch")}
    >
      Add Batch
    </button>

    <button
      className="main-btn"
      onClick={() => navigate("/billing")}
    >
      Billing
    </button>

    <button
      className="main-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <button className="main-btn" onClick={() => navigate("/add-medicine")}>
        Add Medicine
      </button>

      <button className="main-btn" onClick={() => navigate("/view-medicines")}>
        View Medicines
      </button>

      <button className="main-btn" onClick={() => navigate("/profile")}>
        Profile
      </button>

      <button className="main-btn" onClick={() => navigate("/add-batch")}>
        Add Batch
      </button>

      <button className="main-btn" onClick={() => navigate("/billing")}>
        Billing
      </button>

      <button className="main-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}

</div>
      {/* Main Content Card */}
      <div className="card-box">
        <h2 className="page-title">Welcome, {storeName}👋</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Stat Cards */}
          <div className="batch-card">
            <h3>Total Medicines</h3>
            <h2>{totalMedicines}</h2>
          </div>
          <div className="batch-card">
            <h3>Low Stock</h3>
            <h2>{lowStockMedicines}</h2>
          </div>
          <div className="batch-card">
            <h3>Out Of Stock</h3>
            <h2>{outOfStockMedicines}</h2>
          </div>
          <div className="batch-card">
            <h3>Expired</h3>
            <h2>{expiredMedicines}</h2>
          </div>
        </div>
      </div>

    <footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | Developed By <strong>Dharsha Gayathri G </strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>
  );
}

export default Dashboard;