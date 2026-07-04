import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Billing.css";
function Billing() {
    const navigate = useNavigate();
    const handleLogout = () => {

  localStorage.removeItem("store_name");
  localStorage.removeItem("store_id");

  navigate("/");
};
    const [medicines, setMedicines] = useState([]);
    const [medicineId, setMedicineId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [billItems, setBillItems] = useState([]);
    const [customerName, setCustomerName] = useState("");

useEffect(() => {

  const storeId = localStorage.getItem("store_id");

  fetch(
    `https://test-medibill-server.ramchintech.com/view-medicines/${storeId}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMedicines(data);
    })
    .catch(err => console.log(err));

}, []);
  
  const handleAddToBill = () => {

  if (!medicineId || !quantity) {
    alert("Select medicine and quantity");
    return;
  }

  const selectedMedicine = medicines.find(
    (m) => m.id === Number(medicineId)
  );

  const newItem = {
  medicine_name: selectedMedicine.medicine_name,
  quantity: Number(quantity),
  price: Number(selectedMedicine.price),
  total:
    Number(quantity) *
    Number(selectedMedicine.price)
};

  setBillItems([...billItems, newItem]);

  setQuantity("");
};

  const grandTotal = billItems.reduce(
  (sum, item) => sum + item.total,0);

  const handlePayment = () => {

  const options = {
    key: "rzp_test_SyEake7SXg5SeL",
    amount: grandTotal * 100,
    currency: "INR",
    name: "Medicine Store",
    description: "Medicine Purchase",

    handler: function(response) {

  alert(
    "Payment Successful\nPayment ID: " +
    response.razorpay_payment_id
  );

  handleGenerateBill(
    response.razorpay_payment_id
  );

}
  };

  const rzp = new window.Razorpay(options);
  rzp.open();

};

  const handleGenerateBill = async (paymentId) => {

  try {

    const response = await fetch(
      "https://test-medibill-server.ramchintech.com/generate-bill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  customer_name: customerName,
  total_amount: grandTotal,
  payment_id: paymentId,
  bill_items: billItems
})
      }
    );

    const data = await response.json();

if (data.status === "success") {

  navigate(`/bill/${data.bill_id}`);

}

  } catch (error) {

    console.log(error);

  }

};
  const [menuOpen, setMenuOpen] = useState(false);
  return (

<div>

<div className="hero-section">
  <h1 className="hero-title">
    Medicine Stock Management System
  </h1>
  <p className="hero-subtitle">
    Billing Portal
  </p>
</div>

<div style={{ padding: "20px" }}>
  
  
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

  {menuOpen && (
    <div className="mobile-menu">

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
  
  <button
  className="btn-history"
  onClick={() => navigate("/bill-history")}
>
  Bill History
</button>
    </div>
    <div className="batch-card">
    
    <label className="form-label">
Customer Name
</label>
    <input
className="form-control"
  type="text"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>

    
    <label className="form-label">
Select Medicine
</label>

    <select
className="form-select"
      value={medicineId}
      onChange={(e) => setMedicineId(e.target.value)}
    >
      <option value="">Select Medicine</option>

      {medicines.map((m) => (
        <option
          key={m.id}
          value={m.id}
        >
          {m.medicine_name}
        </option>
      ))}
    </select>

    
    <label className="form-label">
Quantity
</label>

    <input
className="form-control"
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    />
    <button
  className="btn-add"
  onClick={handleAddToBill}
>
  Add To Bill
</button>

    <hr />

    <h3>Bill Items</h3>

    {billItems.length === 0 ? (
      <p>No items added</p>
    ) : (
      billItems.map((item, index) => (
        <div key={index} className="bill-item">
          {item.medicine_name}
          {" - Qty: "}
          {item.quantity}
          {" × ₹"}
          {item.price}
          {" = ₹"}
          {item.total}
        </div>
      ))
    )}

    <hr />

    <div className="total-box">
  Grand Total : ₹{grandTotal}
  
</div>
<br />
    <button
  className="btn-pay"
  onClick={handlePayment}
>
  Pay
</button>
<br />
<br />
    

  </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
</div>

);
}

export default Billing;