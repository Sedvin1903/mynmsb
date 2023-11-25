// Home.jsx
import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
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
  const [authenticated, setAuthenticated] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [stockNotFound, setStockNotFound] = useState(false);
  const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
  requireAuth();

  useEffect(() => {
    fetchAllStocksData();
  }, []);

  const navigate = useNavigate();

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
      // console.log(results);
      if (results === "") {
        alert("Stock Not Found!");
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
            <Link to="/add" className="nav-link me-3 text-white">
              Add Stocks
            </Link>
            <Link to="/update" className="nav-link me-3 text-white">
              Update Stocks
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
      {/* Search bar */}
      <br />
      <br />
      <div className="container mt-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by stock ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
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
                    <th>Status</th>
                    {/* Add other columns as needed */}
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
                      <td className={getStatusColor(stock.status)}>
                        {stock.status}
                      </td>
                      {/* Add other columns as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <br />
      {/* Display all stocks */}
      <div className="container mt-3">
        <h2>All Stocks</h2>
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
              <th>Status</th>
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
                <td className={getStatusColor(stock.status)}>{stock.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
