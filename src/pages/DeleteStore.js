import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteStore.css";

function DeleteStore() {

  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/stores");
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async (e) => {
    const id = e.target.value;
    setSelectedStore(id);

    try {
      const res = await fetch(`http://127.0.0.1:5000/store/${id}`);
      const data = await res.json();
      setStoreInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {

    if (!selectedStore) {
      alert("Select a store first");
      return;
    }

    // ✅ CONFIRMATION POPUP
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this store? This will remove all medicines and batches."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/delete-store/${selectedStore}`,
        { method: "DELETE" }
      );

      const msg = await res.text();

      alert(msg);

      // refresh page data
      setSelectedStore("");
      setStoreInfo(null);
      fetchStores();

    } catch (err) {
      console.log(err);
      alert("Error deleting store");
    }
  };

  return (
    <div>

      <div className="hero-section">
        <h1 className="hero-title">Medicine Stock Management System</h1>
        <p className="hero-subtitle">Admin Panel - Delete Store</p>
      </div>

      <div className="delete-container">

        <h2>Select Store</h2>

        <select
          className="store-select"
          value={selectedStore}
          onChange={handleSelect}
        >
          <option value="">-- Select Store --</option>

          {stores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.store_name}
            </option>
          ))}
        </select>

        {storeInfo && (
          <div className="store-box">

            <p><b>Store Name:</b> {storeInfo.store_name}</p>
            <p><b>Owner:</b> {storeInfo.owner_name}</p>
            <p><b>Phone:</b> {storeInfo.phone}</p>
            <p><b>Email:</b> {storeInfo.email}</p>

          </div>
        )}

        <div className="btn-group">

          <button className="delete-btn" onClick={handleDelete}>
            Delete Store
          </button>

          <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
            Back
          </button>

        </div>

      </div>

      <footer className="dashboard-footer">
        Medicine Stock Management System | © 2026 All Rights Reserved
      </footer>

    </div>
  );
}

export default DeleteStore;