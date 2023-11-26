// addStock.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addStock, searchStockById } from "../service/service"; // Import searchStockById
import useAuth from "../service/useAuth";

const AddStock = () => {
  const [stockId, setId] = useState("");
  const [stockName, setName] = useState("");
  const [stockPrice, setPrice] = useState("");
  const [stockQuantity, setQuantity] = useState("");
  const [stockSupplier, setSupplier] = useState("");
  const [orderCompletionDate, setOcd] = useState("");
  const [stockStatus, setStatus] = useState("active");

  const { requireAuth } = useAuth();

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  async function save(event) {
    event.preventDefault();

    console.log(stockId);
    if (
      stockId === "" ||
      stockName === "" ||
      stockPrice === "" ||
      stockQuantity === "" ||
      stockSupplier === "" ||
      orderCompletionDate === "" ||
      stockStatus === ""
    ) {
      alert("Please fill all the fields!");
      return;
    }

    // Validate stockId
    if (!/^\d{6}$/.test(stockId)) {
      alert("Stock ID should be a 6-digit number.");
      return;
    }

    // Validate other fields

    const calculatedAmt = parseFloat(stockPrice) * parseInt(stockQuantity);

    const data = {
      itemId: parseInt(stockId),
      stockName: stockName,
      stockPrice: parseFloat(stockPrice),
      stockQuantity: parseInt(stockQuantity),
      stockAmt: parseFloat(calculatedAmt.toFixed(2)),
      stockSupplier: stockSupplier,
      orderCompletionDate: orderCompletionDate,
      status: stockStatus,
    };

    // Check if stockId is already present
    try {
      const existingStock = await searchStockById(stockId);
      //console.log(existingStock);
      if (existingStock !== "null") {
        alert("Stock ID already exists. Please choose a different Stock ID.");
        resetForm();
        return;
      } else {
        await addStock(data);
        alert("Stock added Successfully");
        resetForm();
      }
    } catch (error) {
      console.error("Error checking existing stock:", error);
      return;
    }
  }

  function resetForm() {
    setId("");
    setName("");
    setPrice("");
    setQuantity("");
    setSupplier("");
    setOcd("");
    setStatus("active");
  }

  return (
    <div>
      {/* Responsive Navigation bar */}
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#485c7f" }}
      >
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand text-white">
            StockEasy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              {" "}
              {/* "ms-auto" pushes the links to the right */}
              <Link to="/home" className="nav-link text-white">
                Home
              </Link>
              <Link to="/update" className="nav-link text-white">
                Update Stocks
              </Link>
              <Link to="/delete" className="nav-link text-white">
                Delete Stocks
              </Link>
              <Link to="/" className="btn btn-light rounded-pill">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="container mt-5 stock-container">
        <h1 className="text-center mb-4">Add Stocks</h1>
        <form>
          {/* Form Fields */}
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="text"
              className="form-control"
              value={stockId}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Stock Name</label>
            <input
              type="text"
              className="form-control"
              value={stockName}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price (in Rs.)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={stockPrice}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              value={stockQuantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              className="form-control"
              value={stockSupplier}
              onChange={(event) => setSupplier(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Order Completion Date</label>
            <input
              type="date"
              className="form-control"
              value={orderCompletionDate}
              onChange={(event) => setOcd(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              value={stockStatus}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="active">Active</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary col-12 col-md-3" onClick={save}>
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
