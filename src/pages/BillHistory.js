import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BillHistory.css";
function BillHistory() {

  const navigate = useNavigate();

  const [bills, setBills] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:5000/bill-history")
      .then(res => res.json())
      .then(data => setBills(data))
      .catch(err => console.log(err));

  }, []);

  return (
<div>

  <div className="hero-section">
    <h1 className="hero-title">
      Medicine Stock Management System
    </h1>

    <p className="hero-subtitle">
      Bill History Portal
    </p>
  </div>

  <div className="bill-container">

    <h2>Bill History</h2>

    <hr />

    {bills.length === 0 ? (

      <p className="empty-msg">
        No Bills Found
      </p>

    ) : (

      bills.map((bill) => (

        <div
          key={bill.id}
          className="bill-card"
        >

          <p>
            <strong>Bill No :</strong> {bill.id}
          </p>

          <p>
            <strong>Customer :</strong> {bill.customer_name}
          </p>

          <p>
            <strong>Total :</strong> ₹{bill.total_amount}
          </p>

          <p>
            <strong>Date :</strong> {bill.bill_date}
          </p>

        </div>

      ))

    )}

    <button
      className="back-btn"
      onClick={() => navigate("/billing")}
    >
      Back To Billing
    </button>

  </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>

</div>
);
}

export default BillHistory;