import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditStore.css";

function EditStore() {

  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const [form, setForm] = useState({
    store_name: "",
    password: "",
    owner_name: "",
    phone: "",
    email: "",
    address: ""
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
        `https://test-medibill-server.ramchintech.com/store/${storeId}`
      );

      const data = await response.json();

      setForm(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {

    try {

      const response = await fetch(
        `https://test-medibill-server.ramchintech.com/update-store/${selectedStore}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.text();

      alert(data);

    } catch (error) {

      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div>

      <div className="hero-section">
        <h1 className="hero-title">
          Medicine Stock Management System
        </h1>

        <p className="hero-subtitle">
          Admin Panel - Edit Store
        </p>
      </div>

      <div className="editstore-container">

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

        <p>Store Name</p>
        <input
          className="store-input"
          name="store_name"
          value={form.store_name || ""}
          onChange={handleChange}
        />

        <p>Password</p>
        <input
          className="store-input"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />

        <p>Owner Name</p>
        <input
          className="store-input"
          name="owner_name"
          value={form.owner_name || ""}
          onChange={handleChange}
        />

        <p>Phone</p>
        <input
          className="store-input"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />

        <p>Email</p>
        <input
          className="store-input"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
        />

        <p>Address</p>
        <textarea
          className="store-input"
          name="address"
          value={form.address || ""}
          onChange={handleChange}
        />

        <button
    className="update-btn"
    onClick={handleUpdate}
  >
    Update Store
  </button>

  <button
    className="back-btn"
    onClick={() => navigate("/admin-dashboard")}
  >
    Back
  </button>

      </div>

      <footer className="dashboard-footer">
        Medicine Stock Management System | © 2026 All Rights Reserved
      </footer>

    </div>
  );
}

export default EditStore;