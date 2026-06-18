import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "./BillView.css";
function BillView() {

  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {

    fetch(`http://127.0.0.1:5000/bill/${id}`)
      .then(res => res.json())
      .then(data => {

        setBill(data.bill);
        setItems(data.items);

      })
      .catch(err => console.log(err));

  }, [id]);

  if (!bill) {
    return <h2>Loading...</h2>;
  }
  const downloadPDF = () => {

  const doc = new jsPDF();

  // Store Header
  doc.setFontSize(18);
  doc.text("MEDICINE STOCK MANAGEMENT SYSTEM", 20, 20);

  doc.setFontSize(10);
  doc.text("Medical Store Invoice", 20, 28);
  doc.text("Phone: +91 XXXXX XXXXX", 20, 34);

  // Bill Details
  doc.setFontSize(12);
  doc.line(20, 40, 190, 40);

  doc.text(`Bill No : ${bill.id}`, 20, 50);
  doc.text(`Customer : ${bill.customer_name}`, 20, 60);

  doc.text(
    `Payment ID : ${bill.payment_id || "N/A"}`,
    20,
    70
  );

  doc.text(
    `Date : ${new Date(
      bill.bill_date
    ).toLocaleString()}`,
    20,
    80
  );

  doc.line(20, 90, 190, 90);

  // Table Header
  let y = 100;

  doc.setFontSize(12);
  doc.text("Medicine", 20, y);
  doc.text("Qty", 90, y);
  doc.text("Price", 120, y);
  doc.text("Total", 160, y);

  y += 5;

  doc.line(20, y, 190, y);

  y += 10;

  // Medicines
  items.forEach((item) => {

    doc.text(
      item.medicine_name,
      20,
      y
    );

    doc.text(
      String(item.quantity),
      90,
      y
    );

    doc.text(
      `Rs.${item.price}`,
      120,
      y
    );

    doc.text(
      `Rs.${item.total}`,
      160,
      y
    );

    y += 10;

  });

  // GST
  const gst = (
    Number(bill.total_amount) * 0.05
  ).toFixed(2);

  y += 10;

  doc.line(20, y, 190, y);

  y += 10;

  doc.text(
    `GST (5%) : Rs.${gst}`,
    20,
    y
  );

  y += 10;

  doc.setFontSize(14);

  doc.text(
    `Grand Total : Rs.${bill.total_amount}`,
    20,
    y
  );

  y += 20;

  doc.setFontSize(12);

  doc.text(
    "Authorized Signature",
    140,
    y
  );

  doc.save(`Bill_${bill.id}.pdf`);
};
  return (
  <div className="bill-container">

    <div className="bill-card">

      <h1 className="bill-title">
        Bill Receipt
      </h1>

      <hr />

      <div className="bill-info">

      <h1>Bill Receipt</h1>

      <hr />

      <p>
        <strong>Bill No :</strong> {bill.id}
      </p>

      <p>
        <strong>Customer :</strong> {bill.customer_name}
      </p>

      <p>
        <strong>Payment ID :</strong> {bill.payment_id}
      </p>

      <p>
        <strong>Total :</strong> ₹{bill.total_amount}
      </p>

      <hr />

      <h3>Medicines Purchased</h3>

      {items.map((item) => (

        <div
  key={item.id}
  className="medicine-card"
>
          <p>
            <strong>Medicine :</strong>
            {" "}
            {item.medicine_name}
          </p>

          <p>
            <strong>Quantity :</strong>
            {" "}
            {item.quantity}
          </p>

          <p>
            <strong>Price :</strong>
            {" "}
            ₹{item.price}
          </p>

          <p>
            <strong>Total :</strong>
            {" "}
            ₹{item.total}
          </p>

        </div>

      ))}

      <hr />

      <div className="total-box">
  Grand Total : ₹{bill.total_amount}
</div>

<button
  onClick={downloadPDF}
  className="btn btn-success download-btn"
>
  Download PDF Bill
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

export default BillView;