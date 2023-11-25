// UpdateStock.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        setUpdatedStockDetails({ ...stockDetails }); // Copy the details for updates
        setShowUpdateButton(true); // Show the update button after fetching details
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

      // Update stockAmt if stockQuantity or stockPrice changes
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
    setShowUpdateButton(false); // Hide the update button after resetting the form
  }

  return (
    <div>
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
            <Link to="/delete" className="nav-link me-3 text-white">
              Delete Stocks
            </Link>
            <Link to="/" className="btn btn-light me-3 rounded-pill">
              Logout
            </Link>
          </div>
        </div>
      </nav>

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
          <button className="btn btn-primary col-2" onClick={fetchStockDetails}>
            Fetch Stock Details
          </button>

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
              <button
                className="btn btn-primary col-2"
                onClick={updateStockData}
              >
                Update Stock
              </button>
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
