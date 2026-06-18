import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateStore.css";

function CreateStore() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    store_name: "",
    password: "",
    owner_name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/create-store", form);

      alert(res.data.message);

      navigate("/admin-dashboard");

    } catch (error) {
      console.log(error);
      alert("Error creating store");
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-section">
        <h1 className="hero-title">Medicine Stock Management System</h1>
        <p className="hero-subtitle">Admin Panel - Create New Store</p>
      </div>

      {/* FORM CARD */}
      <div className="profile-container">

        <h2 className="profile-title">Create Store</h2>

        <label>Store Name</label>
        <input className="profile-input" name="store_name" onChange={handleChange} />

        <label>Password</label>
        <input className="profile-input" type="password" name="password" onChange={handleChange} />

        <label>Owner Name</label>
        <input className="profile-input" name="owner_name" onChange={handleChange} />

        <label>Phone</label>
        <input className="profile-input" name="phone" onChange={handleChange} />

        <label>Email</label>
        <input className="profile-input" name="email" onChange={handleChange} />

        <label>Address</label>
        <textarea className="profile-textarea" name="address" onChange={handleChange}></textarea>

        <button className="save-btn" onClick={handleSubmit}>
          Create Store
        </button>

        <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
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

export default CreateStore;