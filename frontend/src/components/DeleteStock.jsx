// DeleteStock.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteStock, searchStockById } from "../service/service";
import useAuth from "../service/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteStock = () => {
  const [stockId, setStockId] = useState("");
  const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  async function deleteStockData() {
    try {
      const response1 = await searchStockById(stockId);
     // console.log(response1);
      if (response1 === "null") {
        alert("Stock Not Found!");
      } else {
         alert("Stock deleted successfully!");
         await deleteStock(stockId);
      }

      resetForm();
    } catch (err) {
      console.error("Error deleting stock:", err);
      alert("Error deleting stock: " + err.message);
    }
  }

  function resetForm() {
    setStockId("");
  }

  return (
    <div>
      {/* Your navigation bar */}
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
              <Link to="/add" className="nav-link text-white">
                Add Stocks
              </Link>
              <Link to="/update" className="nav-link text-white">
                Update Stocks
              </Link>
              <Link to="/" className="btn btn-light rounded-pill">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-5 stock-container">
        <h1 className="text-center mb-4">Delete Stocks</h1>
        <form>
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="text"
              className="form-control"
              value={stockId}
              onChange={(e) => setStockId(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger col-12 col-md-2"
              onClick={deleteStockData}
            >
              Delete Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteStock;
