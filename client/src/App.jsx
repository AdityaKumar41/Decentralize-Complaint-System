// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PoliceComplaintForm from "./components/Police";
import FoodComplaintForm from "./components/Food";
import Login from "./Login";

const App = () => {
  return (
    <Router>
      <Login />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/police-complaint">Police Complaint</Link>
            </li>
            <li>
              <Link to="/food-complaint">Food Complaint</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/police-complaint" element={<PoliceComplaintForm />} />
          <Route path="/food-complaint" element={<FoodComplaintForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
