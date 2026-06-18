import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBatch.css";

function AddBatch() {

  const navigate = useNavigate();

  const handleLogout = () => {

  localStorage.removeItem("store_name");
  localStorage.removeItem("store_id");

  navigate("/");
};
  const [medicineId, setMedicineId] = useState("");

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

const [medicines, setMedicines] = useState([]);

useEffect(() => {

  const storeId = localStorage.getItem("store_id");

  fetch(`http://127.0.0.1:5000/medicines/${storeId}`)
    .then(res => res.json())
    .then(data => {
      console.log("Medicines from DB:", data);  // 👈 IMPORTANT
      setMedicines(data);
    })
    .catch(err => console.log(err));

}, []);
  const handleSubmitBatch = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:5000/add-batch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          medicine_id: medicineId,
          batch_no: batchNo,
          rack_no: rackNo,
          mfg_date: mfgDate,
          exp_date: expDate,
          hsn_code: hsnCode,
          quantity: quantity,
          free_quantity: freeQuantity,
          unit_per_pack: unitPerPack,
          rate_per_quantity: ratePerQuantity,
          gst: gst,
          mrp: mrp,
          profit: profit,
          purchase_date: purchaseDate,
          supplier_phone: supplierPhone
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
  console.log("medicines state =", medicines);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>

  <div className="hero-section">
    <h1>Medicine Stock Management System</h1>
    <p>Add Batch Portal</p>
  </div>
    <div style={{ padding: "0.01px" }}>

      <div
  style={{
    
    color: "white",
    padding: "2px",
    marginBottom: "10px"
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

    <button className="main-btn" onClick={() => navigate("/profile")}>
      Profile
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

      <button className="main-btn" onClick={() => navigate("/profile")}>
        Profile
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
Add Batch Details
</h2>
<select
className="form-select"
  value={medicineId}
  onChange={(e) => setMedicineId(e.target.value)}
>
  <option value="">Select Medicine</option>

  {medicines.map((m) => (
    <option key={m.id} value={m.id}>
      {m.medicine_name}
    </option>
  ))}
</select>

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
className="btn btn-success action-btn"
onClick={handleSubmitBatch}
>
  <div className="button-group"></div>
  Submit Batch
</button>
      <button
className="btn btn-secondary action-btn"
onClick={() => navigate("/add-medicine")}
>
    
        Back to Add Medicine
      </button>
</div>
    </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
    </div>
  );
  
}

export default AddBatch;