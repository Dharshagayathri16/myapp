import { useState, useEffect } from "react";
import "./ViewStores.css";
import { useNavigate } from "react-router-dom";

function ViewStores() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const [summary, setSummary] = useState({
    total: 0,
    low_stock: 0,
    out_of_stock: 0,
    expired: 0
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {

      const response = await fetch(
        "https://test-medibill-server.ramchintech.com/stores"
      );

      const data = await response.json();

      setStores(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreChange = async (e) => {

    const storeId = e.target.value;

    setSelectedStore(storeId);

    try {

      const response = await fetch(
        `https://test-medibill-server.ramchintech.com/store-summary/${storeId}`
      );

      const data = await response.json();

      setSummary(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="hero-section">
        <h1 className="hero-title">
          Medicine Stock Management System
        </h1>

        <p className="hero-subtitle">
          Admin Panel - View Stores
        </p>
      </div>

      <div className="viewstore-container">

        <h2>Select Store</h2>

        <select
          className="store-select"
          value={selectedStore}
          onChange={handleStoreChange}
        >

          <option value="">
            -- Select Store --
          </option>

          {stores.map((store) => (
            <option
              key={store.id}
              value={store.id}
            >
              {store.store_name}
            </option>
          ))}

        </select>

        <div className="summary-card">

          <p>
            <strong>Total Medicines :</strong>
            {" "}
            {summary.total}
          </p>

          <p>
            <strong>Low Stock :</strong>
            {" "}
            {summary.low_stock}
          </p>

          <p>
            <strong>Out Of Stock :</strong>
            {" "}
            {summary.out_of_stock}
          </p>

          <p>
            <strong>Expired :</strong>
            {" "}
            {summary.expired}
          </p>
        
        </div>
      <button
  className="back-btn"
  onClick={() => navigate("/admin-dashboard")}
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

export default ViewStores;