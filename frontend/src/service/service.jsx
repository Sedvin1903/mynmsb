// service.jsx

import axios from "axios";

// Function to fetch all stocks
export const fetchAllStocks = async () => {
  try {
    const response = await axios.get(
      "https://sias-backend.onrender.com:8081/api/v1/stock/getAll"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all stocks:", error);
    throw error;
  }
};

// Function to search for a stock by ID
export const searchStockById = async (stockId) => {
  try {
    const response = await axios.get(
      `https://sias-backend.onrender.com:8081/api/v1/stock/search/${stockId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching stocks:", error);
    return "null";
  }
};

// Function to get the status color
export const getStatusColor = (status) => {
  if (status === "active") {
    return "bg-success text-white";
  } else if (status === "out of stock") {
    return "bg-danger text-white";
  }
  return ""; // Default styling
};

// Function to add a new stock
export const addStock = async (data) => {
  try {
    await axios.post("https://sias-backend.onrender.com:8081/api/v1/stock/save", data);
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};

// Function to update an existing stock
export const updateStock = async (stockId, data) => {
  try {
    await axios.put(`https://sias-backend.onrender.com:8081/api/v1/stock/edit/${stockId}`, data);
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
};

// Function to delete a stock
export const deleteStock = async (stockId) => {
  try {
    await axios.delete(`https://sias-backend.onrender.com:8081/api/v1/stock/delete/${stockId}`);
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
};
