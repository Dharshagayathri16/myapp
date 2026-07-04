import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BatchHistory.css";

function BatchHistory() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [batches, setBatches] = useState([]);

  useEffect(() => {
  fetchBatchHistory();
}, [id]);

  const fetchBatchHistory = async () => {

    try {

      const response = await fetch(
        `https://test-medibill-server.ramchintech.com/batch-history/${id}`
      );

      const data = await response.json();

      setBatches(data);

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
        Batch History Portal
      </p>
    </div>

    <div className="batch-container">

      <h2>Batch History</h2>

      <div className="medicine-info">
        <strong>Medicine ID :</strong> {id}
      </div>

      {batches.length === 0 ? (

        <p className="empty-msg">
          No Batch Records Found
        </p>

      ) : (

        batches.map((batch) => (

          <div
            key={batch.id}
            className="batch-card"
          >

            <p>
              <strong>Batch No :</strong>
              {" "}
              {batch.batch_no}
            </p>

            <p>
              <strong>Quantity :</strong>
              {" "}
              {batch.quantity}
            </p>

            <p>
              <strong>Expiry Date :</strong>
              {" "}
              {new Date(batch.exp_date)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}
            </p>

          </div>

        ))

      )}

      <button
        className="back-btn"
        onClick={() => navigate("/view-medicines")}
      >
        Back To Medicines
      </button>

    </div>
<footer className="dashboard-footer">
  <span><strong>Medicine Stock Management System</strong></span>
  <span> | © 2026 All Rights Reserved</span>
</footer>
  </div>
);
}

export default BatchHistory;