import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddStock from "./components/AddStock";
import UpdateStocks from "./components/UpdateStock";
import DeleteStocks from "./components/DeleteStock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddStock />} />
        <Route path="/update" element={<UpdateStocks />} />
        <Route path="/delete" element={<DeleteStocks />} />
      </Routes>
    </Router>
  );
}

export default App;
