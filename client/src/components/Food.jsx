// src/components/FoodComplaintForm.jsx
import React, { useState } from "react";

const FoodComplaintForm = () => {
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Food Complaint Submitted: ${complaint}`);
    setComplaint("");
  };

  return (
    <div>
      <h2>Food Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter your complaint"
          rows="5"
          required
        />
        <br />
        <button type="submit">Submit Food Complaint</button>
      </form>
    </div>
  );
};

export default FoodComplaintForm;
