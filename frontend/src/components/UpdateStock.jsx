// UpdateStock.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateStock, searchStockById } from "../service/service";
import useAuth from "../service/useAuth";

const UpdateStock = () => {
  const [stockId, setId] = useState("");
  const [stockDetails, setStockDetails] = useState(null);
  const [updatedStockDetails, setUpdatedStockDetails] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [priceQuantity, setPriceQuantity] = useState({
    stockPrice: 0,
    stockQuantity: 0,
  });
  const { requireAuth } = useAuth();

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  useEffect(() => {
    setUpdatedStockDetails((prevDetails) => ({
      ...prevDetails,
      stockAmt: priceQuantity.stockPrice * priceQuantity.stockQuantity,
    }));
  }, [priceQuantity.stockPrice, priceQuantity.stockQuantity]);

  function handleStockIdChange(event) {
    setId(event.target.value);
  }

  const fetchStockDetails = async () => {
    try {
      const stockDetails = await searchStockById(stockId);
      console.log(stockDetails);
      if (stockDetails === "null") {
        alert("Stock Not Found!");
        resetForm();
      } else {
        setStockDetails(stockDetails);
        setUpdatedStockDetails({ ...stockDetails });
        setShowUpdateButton(true);
        setPriceQuantity({
          stockPrice: stockDetails.stockPrice,
          stockQuantity: stockDetails.stockQuantity,
        });
      }
    } catch (error) {
      console.error("Error fetching stock details:", error);
      alert("Stock Not Found!");
      resetForm();
    }
  };

  function handleUpdate(index, value) {
    setUpdatedStockDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [index]: value,
      };

      if (index === "stockQuantity" || index === "stockPrice") {
        updatedDetails.stockAmt =
          updatedDetails.stockQuantity * updatedDetails.stockPrice;
      }

      return updatedDetails;
    });
  }

  function handlePriceQuantityChange(key, value) {
    setPriceQuantity((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function updateStockData(event) {
    event.preventDefault();

    try {
      await updateStock(stockId, updatedStockDetails);
      alert("Stock Updated Successfully");
      resetForm();
    } catch (err) {
      console.error("Error updating stock:", err);
    }
  }

  function resetForm() {
    setId("");
    setStockDetails(null);
    setUpdatedStockDetails(null);
    setShowUpdateButton(false);
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
              <Link to="/add" className="nav-link text-white">
                Add Stocks
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
        <h1 className="text-center mb-4">Update Stocks</h1>
        <div>
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="text"
              className="form-control"
              value={stockId}
              onChange={handleStockIdChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary col-12 col-md-3"
              onClick={fetchStockDetails}
            >
              Fetch Stock Details
            </button>
          </div>

          <br />
          <br />

          {stockDetails && showUpdateButton && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Stock Properties</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(updatedStockDetails).map(
                    ([key, value]) =>
                      key !== "stockId" && (
                        <tr key={key}>
                          <td>{getFieldDisplayName(key)}</td>
                          <td>
                            {key === "status" ? (
                              <select
                                className="form-control"
                                value={value}
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              >
                                <option value="active">Active</option>
                                <option value="out of stock">
                                  Out of Stock
                                </option>
                              </select>
                            ) : key === "orderCompletionDate" ? (
                              <input
                                type="date"
                                className="form-control"
                                value={
                                  new Date(value).toISOString().split("T")[0]
                                }
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              />
                            ) : key === "stockQuantity" ? (
                              <input
                                type="number"
                                className="form-control"
                                value={value}
                                onChange={(e) => {
                                  handleUpdate(key, e.target.value);
                                  handlePriceQuantityChange(
                                    key,
                                    e.target.value
                                  );
                                }}
                              />
                            ) : key === "itemId" ? (
                              <input
                                type="text"
                                className="form-control"
                                value={stockId}
                                disabled
                              />
                            ) : key === "stockName" ? (
                              <input
                                type="text"
                                className="form-control"
                                value={value}
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              />
                            ) : key === "stockPrice" ? (
                              <input
                                type="number"
                                className="form-control"
                                value={value}
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              />
                            ) : key === "stockSupplier" ? (
                              <input
                                type="text"
                                className="form-control"
                                value={value}
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              />
                            ) : key === "stockAmt" ? (
                              <input
                                type="text"
                                className="form-control"
                                value={value}
                                readOnly
                              />
                            ) : (
                              <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  handleUpdate(key, e.target.value)
                                }
                              />
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary col-12 col-md-3"
                  onClick={updateStockData}
                >
                  Update Stock
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getFieldDisplayName = (fieldName) => {
  switch (fieldName) {
    case "stockName":
      return "Stock Name";
    case "stockPrice":
      return "Stock Price";
    case "stockQuantity":
      return "Stock Quantity";
    case "stockAmt":
      return "Stock Amount";
    case "stockSupplier":
      return "Stock Supplier";
    case "orderCompletionDate":
      return "Order Completion Date";
    case "status":
      return "Stock Status";
    default:
      return fieldName;
  }
};

export default UpdateStock;
