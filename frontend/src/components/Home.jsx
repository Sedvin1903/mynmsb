import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import {
  fetchAllStocks,
  searchStockById,
  getStatusColor,
} from "../service/service";
import useAuth from "../service/useAuth";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [stockNotFound, setStockNotFound] = useState(false);
  //const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
 // requireAuth();

  useEffect(() => {
    fetchAllStocksData();
  }, []);

  const fetchAllStocksData = async () => {
    try {
      const stocks = await fetchAllStocks();
      setAllStocks(stocks);
    } catch (error) {
      console.error("Error fetching all stocks:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchStockById(searchQuery);
      if (results === "null") {
        alert("Stock Not Found!");
        setShowSearchResults(false);
      } else {
        setSearchResults(results);
        setShowSearchResults(true);
        setStockNotFound(false);
      }
    } catch (error) {
      console.error("Error searching stocks:", error);
      alert("Stock Not Found!");
    }
  };

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
              <Link to="/add" className="nav-link text-white">
                Add Stocks
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

      {/* Search bar */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search by stock ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mt-3 mt-lg-0">
            <button
              className="btn btn-outline-secondary w-100"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display search results */}
      {showSearchResults && (
        <div className="container mt-3">
          {stockNotFound ? (
            <p className="text-danger">Stock Not Found</p>
          ) : (
            <div>
              <h2>Search Results</h2>
              <div className="table-responsive">
                <table className="table table-gradient">
                  <thead>
                    <tr>
                      <th>Stock ID</th>
                      <th>Stock Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Supplier</th>
                      <th>Order Completion Date</th>
                      <th className="d-lg-table-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[searchResults].map((stock) => (
                      <tr key={stock.itemId}>
                        <td>{stock.itemId}</td>
                        <td>{stock.stockName}</td>
                        <td>{stock.stockPrice}</td>
                        <td>{stock.stockQuantity}</td>
                        <td>{stock.stockAmt}</td>
                        <td>{stock.stockSupplier}</td>
                        <td>
                          {new Date(
                            stock.orderCompletionDate
                          ).toLocaleDateString()}
                        </td>
                        <td
                          className={`d-lg-table-cell ${getStatusColor(
                            stock.status
                          )}`}
                        >
                          {stock.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Display all stocks */}
      <div className="container mt-3">
        <h2>All Stocks</h2>
        <div className="table-responsive">
          <table className="table table-gradient">
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Stock Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Supplier</th>
                <th>Order Completion Date</th>
                <th className="d-lg-table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {allStocks.map((stock) => (
                <tr key={stock.itemId}>
                  <td>{stock.itemId}</td>
                  <td>{stock.stockName}</td>
                  <td>Rs. {stock.stockPrice}</td>
                  <td>{stock.stockQuantity}</td>
                  <td>Rs. {stock.stockAmt}</td>
                  <td>{stock.stockSupplier}</td>
                  <td>
                    {new Date(stock.orderCompletionDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`d-lg-table-cell ${getStatusColor(
                      stock.status
                    )}`}
                  >
                    {stock.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
