import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditMedicine.css";

function EditMedicine() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
  const fetchMedicine = async () => {
    // your existing fetch code
  };

  fetchMedicine();
}, []);

  const fetchMedicine = async () => {
    try {

      const response = await fetch(
        `http://127.0.0.1:5000/medicine/${id}`
      );

      const data = await response.json();

      setMedicineName(data.medicine_name);
      setCategory(data.category);
      setPrice(data.price);
      setStock(data.stock);
      setExpiryDate(data.expiry_date);

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/update-medicine/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            medicine_name: medicineName,
            category: category,
            price: price,
            stock: stock,
            expiry_date: expiryDate
          })
        }
      );

      const data = await response.text();

      alert(data);

      navigate("/view-medicines");

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
      Edit Medicine Portal
    </p>
  </div>

  <div className="edit-container">

    <div className="edit-card">

      <h2 className="text-center mb-4">
        Edit Medicine
      </h2>

      <div className="mb-3">
        <label className="form-label">
          Medicine Name
        </label>

        <input
          type="text"
          className="form-control"
          value={medicineName}
          onChange={(e) =>
            setMedicineName(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Category
        </label>

        <select
          className="form-select"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>Tablet</option>
          <option>Capsule</option>
          <option>Syrup</option>
          <option>Injection</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Price
        </label>

        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Stock
        </label>

        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Expiry Date
        </label>

        <input
          type="date"
          className="form-control"
          value={expiryDate}
          onChange={(e) =>
            setExpiryDate(e.target.value)
          }
        />
      </div>

      <button
        className="btn btn-success update-btn"
        onClick={handleUpdate}
      >
        Update Medicine
      </button>
      
    </div>
<br/>
<br/>
<br/>
<br/>
<button
        className="back-btn"
        onClick={() => navigate("/view-medicines")}
      >
        Back To Medicines
      </button>
  </div>

</div>
  );
}

export default EditMedicine;