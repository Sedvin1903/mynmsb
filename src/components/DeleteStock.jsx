// DeleteStock.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteStock, searchStockById } from "../service/service";
import useAuth from "../service/useAuth";

const DeleteStock = () => {
  const [stockId, setStockId] = useState("");
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  async function deleteStockData() {
    try {
      const response1 = await searchStockById(stockId);
      console.log(response1);
      if (response1 === "null") {
        alert("Stock Not Found!");
      } else {
        const response2 = await deleteStock(stockId);
        alert("Stock deleted successfully!");
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
        className="navbar navbar-light"
        style={{ backgroundColor: "#485c7f" }}
      >
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand text-white">
            StockEasy
          </Link>
          <div className="d-flex align-items-center">
            <Link to="/home" className="nav-link me-3 text-white">
              Home
            </Link>
            <Link to="/add" className="nav-link me-3 text-white">
              Add Stocks
            </Link>
            <Link to="/update" className="nav-link me-3 text-white">
              Update Stocks
            </Link>
            <Link to="/" className="btn btn-light me-3 rounded-pill">
              Logout
            </Link>
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

          <button
            type="button"
            className="btn btn-danger col-2"
            onClick={deleteStockData}
          >
            Delete Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteStock;
