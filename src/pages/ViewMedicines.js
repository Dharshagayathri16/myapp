import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMedicines.css";

function ViewMedicines() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("store_name");
    localStorage.removeItem("store_id");
    navigate("/");
  };

  const [medicines, setMedicines] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchExpiry, setSearchExpiry] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const storeId = localStorage.getItem("store_id");
      const response = await fetch(
        `http://127.0.0.1:5000/view-medicines/${storeId}`
      );
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (stock) => {
    if (stock === 0) {
      return "Out Of Stock ❌";
    } else if (stock < 10) {
      return "Low Stock ⚠️";
    } else {
      return "In Stock ✅";
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete-medicine/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      alert(data);
      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="hero-section">
  <h1 className="hero-title">
    Medicine Stock Management System</h1>
  <p className="hero-subtitle">
    View Medicines Portal
  </p>
</div>
    <div
  style={{
    backgroundColor: "#f4f6f9",
    color: "white",
    padding: "2px",
    marginBottom: "10px"
  }}
>

</div>
      <div className="page-header">
        <div className="header-top">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="desktop-menu">
            <button
              className="main-btn"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="main-btn"
              onClick={() => navigate("/add-medicine")}
            >
              Add Medicine
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
        </div>

        {menuOpen && (
          
          <div className="mobile-menu">
            <button className="main-btn" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button className="main-btn" onClick={() => navigate("/add-medicine")}>
              Add Medicine
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

      <div className="card-box">
        <div className="medicine-container">

<div className="search-box">

        <div className="search-box">

  <h2 className="search-title">
    View Medicines
  </h2>

  <div className="row">

    <div className="col-md-6">
      <label className="form-label">
        Search Medicine Name
      </label>

      <input
        type="text"
        className="form-control"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Enter medicine name"
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">
        Search Expiry Date
      </label>

      <input
        type="date"
        className="form-control"
        value={searchExpiry}
        onChange={(e) => setSearchExpiry(e.target.value)}
      />
    </div>

  </div>

</div>
      </div>
        <br />
        <br />

        {medicines
          .filter((medicine) => {
            const nameMatch =
              medicine.medicine_name
                ?.toLowerCase()
                .includes(searchName.toLowerCase());
            const expiryMatch =
              searchExpiry === "" ||
              medicine.expiry_date === searchExpiry;
            return nameMatch && expiryMatch;
          })
          
          .map((medicine) => (
            <div
  key={medicine.id}
  className="medicine-card"
>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>
                  <strong>Medicine ID :</strong> {medicine.id}
                  {" | "}
                  <strong>Category :</strong> {medicine.category}
                  {" | "}
                  <strong>Reorder :</strong> {medicine.reorder_level}
                  {" | "}
                  <strong>Expiry Date :</strong>{" "}
                  {new Date(medicine.expiry_date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </p>
                {isExpired(medicine.expiry_date) && (
                  <strong className="expired-text">EXPIRED ❌</strong>
                )}
              </div>
              <hr />
              <p>
                <strong>Medicine Name :</strong> {medicine.medicine_name}
              </p>
              <p>
                <strong>Stock :</strong> {medicine.stock}
              </p>
              <p>
                <strong>Status :</strong> {getStatus(medicine.stock)}
              </p>
              <button
className="btn btn-warning action-btn"
                onClick={() =>
                  navigate(`/edit-medicine/${medicine.id}`)
                }
              >
                Edit
              </button>
              <button
className="btn btn-danger action-btn"
                onClick={() =>
                  handleDelete(medicine.id, medicine.medicine_name)
                }
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
              <button
className="btn btn-primary action-btn"
                onClick={() =>
                  navigate(`/batch-history/${medicine.id}`)
                }
                style={{ marginLeft: "10px" }}
              >
                View Batches
              </button>
            </div>
          ))}
      </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>
    </>
  );
}

export default ViewMedicines;