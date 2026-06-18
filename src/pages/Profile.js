import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();
  
  const handleLogout = () => {

  localStorage.removeItem("store_name");
  localStorage.removeItem("store_id");

  navigate("/");
};

  const storeName =
    localStorage.getItem("store_name");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {

  const storeId =
    localStorage.getItem("store_id");

  try {

    const response = await fetch(
      `http://127.0.0.1:5000/profile/${storeId}`
    );

    const data = await response.json();

    setOwnerName(data.owner_name || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setAddress(data.address || "");

  } catch (error) {

    console.log(error);

  }

};

  const handleSave = async () => {

  const storeId =
    localStorage.getItem("store_id");

  try {

    const response = await fetch(
      "http://127.0.0.1:5000/save-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          store_id: storeId,
          owner_name: ownerName,
          phone: phone,
          email: email,
          address: address
        })
      }
    );

    const data = await response.text();

    alert(data);

  } catch (error) {

    console.log(error);
    alert("Server Error");

  }
};
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ padding: "2px" }}>
      <div className="hero-section">
  <h1 className="hero-title">
    Medicine Stock Management System
  </h1>

  <p className="hero-subtitle">
    Store Profile Portal
  </p>
</div>
      <div
  style={{

    marginBottom: "20px"
  }}
>
  <div className="header-top">

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="menu-btn"
    >
      ☰
    </button>

    

  </div>

  <br />

  <div className="desktop-menu">

    <button className="main-btn" onClick={() => navigate("/dashboard")}>
      Dashboard
    </button>

    <button className="main-btn" onClick={() => navigate("/add-medicine")}>
      Add Medicine
    </button>

    <button className="main-btn" onClick={() => navigate("/view-medicines")}>
      View Medicines
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

  {menuOpen && (
    <div className="mobile-menu">

      <button className="main-btn" onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>

      <button className="main-btn" onClick={() => navigate("/add-medicine")}>
        Add Medicine
      </button>

      <button className="main-btn" onClick={() => navigate("/view-medicines")}>
        View Medicines
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

<hr />
      
      
      <div className="batch-card">
      <h2 className="batch-title">
Store Profile
</h2>
      <p>
        <strong>Store Name :</strong>
        {" "}
        {storeName}
      </p>

      <p>Owner Name :</p>
      <input
  className="profile-input"
  type="text"
  value={ownerName}
  onChange={(e) =>
    setOwnerName(e.target.value)
  }
/>

      <p>Phone :</p>

<input
  className="profile-input"
  type="text"
  value={phone}
  onChange={(e) =>
    setPhone(e.target.value)
  }
/>

      <p>Email :</p>

<input
  className="profile-input"
  type="email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
/>

      <p>Address :</p>

<textarea
  className="profile-textarea"
  value={address}
  onChange={(e) =>
    setAddress(e.target.value)
  }
/>

      <br />
      <br />

      <button
  className="save-btn"
  onClick={handleSave}
>
  Save Information
</button>
    
    </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>
  );
}

export default Profile;