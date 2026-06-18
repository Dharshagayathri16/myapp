import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMedicine.css";

function AddMedicine() {
  const navigate = useNavigate();

  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("Tablet");
  const [ndcCode, setNdcCode] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");

  const [batchNo, setBatchNo] = useState("");
  const [rackNo, setRackNo] = useState("");

  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");

  const [hsnCode, setHsnCode] = useState("");

  const [quantity, setQuantity] = useState("");
  const [freeQuantity, setFreeQuantity] = useState("");

  const [unitPerPack, setUnitPerPack] = useState("");

  const [ratePerQuantity, setRatePerQuantity] = useState("");

  const [gst, setGst] = useState("");

  const [mrp, setMrp] = useState("");

  const [profit, setProfit] = useState("");

  const [purchaseDate, setPurchaseDate] = useState("");

  const [supplierPhone, setSupplierPhone] = useState("");

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleAddMedicine = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/add-medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  medicine_name: medicineName,
  category: category,
  price: price,
  stock: stock,
  expiry_date: expiryDate,
  ndc_code: ndcCode,
  reorder_level: reorderLevel,
  store_id: localStorage.getItem("store_id")
}),
      });

      const data = await response.text();

      alert(data);

      if (data === "Medicine Added Successfully") {
        setMedicineName("");
        setCategory("Tablet");
        setNdcCode("");
        setReorderLevel("");
        setPrice("");
        setStock("");
        setExpiryDate("");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Server Error");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    
    <div>
    <div className="hero-section">
  <h1 className="hero-title">
    Medicine Stock Management System
  </h1>

  <p className="hero-subtitle">
    Add Medicine Portal
  </p>
</div>
  <div
    style={{
      
      color: "white",
      padding: "2px"
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

    {menuOpen && (
      <div className="mobile-menu">

        <button className="main-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
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

  <div style={{ padding: "20px" }}>

<hr />
      
      <div className="medicine-container">
        <h2 className="batch-title">
Add New Medicine
</h2>
  <div className="medicine-card">
      
      <label className="form-label">
Medicine Name
</label>
      <input
  className="form-control"
        type="text"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
      />

      
      <label className="form-label">
Category
</label>
      <select
  className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Tablet</option>
        <option>Capsule</option>
        <option>Syrup</option>
        <option>Injection</option>
      </select>

      
      <label className="form-label">
NDC Code
</label>

<input
  className="form-control"
  type="text"
  value={ndcCode}
  onChange={(e) => setNdcCode(e.target.value)}
/>

        
        <label className="form-label">
Price
</label>

<input
  className="form-control"
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>


<label className="form-label">
Stock
</label>

<input
  className="form-control"
  type="number"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
/>


<label className="form-label">
Expiry Date
</label>

<input
  className="form-control"
  type="date"
  value={expiryDate}
  onChange={(e) => setExpiryDate(e.target.value)}
/>

<label className="form-label">
Reorder Level
</label>

<input
  className="form-control"
  type="number"
  value={reorderLevel}
  onChange={(e) => setReorderLevel(e.target.value)}
/>


<label className="form-label">
Batch No
</label>

<input
  className="form-control"
  type="text"
  value={batchNo}
  onChange={(e) => setBatchNo(e.target.value)}
/>


<label className="form-label">
Rack No
</label>

<input
  className="form-control"
  type="text"
  value={rackNo}
  onChange={(e) => setRackNo(e.target.value)}
/>


<label className="form-label">
MFG Date
</label>

<input
  className="form-control"
  type="date"
  value={mfgDate}
  onChange={(e) => setMfgDate(e.target.value)}
/>


<label className="form-label">
EXP Date
</label>

<input
  className="form-control"
  type="date"
  value={expDate}
  onChange={(e) => setExpDate(e.target.value)}
/>




<label className="form-label">
HSN Code
</label>

<input
  className="form-control"
  type="text"
  value={hsnCode}
  onChange={(e) => setHsnCode(e.target.value)}
/>


<label className="form-label">
Quantity
</label>

<input
  className="form-control"
  type="number"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
/>


<label className="form-label">
Free Quantity
</label>

<input
  className="form-control"
  type="number"
  value={freeQuantity}
  onChange={(e) => setFreeQuantity(e.target.value)}
/>


<label className="form-label">
Unit Per Pack
</label>

<input
  className="form-control"
  type="number"
  value={unitPerPack}
  onChange={(e) => setUnitPerPack(e.target.value)}
/>


<label className="form-label">
Rate / Quantity
</label>

<input
  className="form-control"
  type="number"
  value={ratePerQuantity}
  onChange={(e) => setRatePerQuantity(e.target.value)}
/>


<label className="form-label">
GST %
</label>

<input
  className="form-control"
  type="number"
  value={gst}
  onChange={(e) => setGst(e.target.value)}
/>


<label className="form-label">
MRP 
</label>

<input
  className="form-control"
  type="number"
  value={mrp}
  onChange={(e) => setMrp(e.target.value)}
/>


<label className="form-label">
Profit %
</label>

<input
  className="form-control"
  type="number"
  value={profit}
  onChange={(e) => setProfit(e.target.value)}
/>


<label className="form-label">
Purchase Date
</label>

<input
  className="form-control"
  type="date"
  value={purchaseDate}
  onChange={(e) => setPurchaseDate(e.target.value)}
/>


<label className="form-label">
Supplier Phone
</label>

<input
  className="form-control"
  type="text"
  value={supplierPhone}
  onChange={(e) => setSupplierPhone(e.target.value)}
/>

      

      <button
  className="btn btn-success add-btn"
  onClick={handleAddMedicine}
>
  Add Medicine
</button>
</div>
</div>
</div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>
  
  );
}

export default AddMedicine;