// src/components/PoliceComplaintForm.jsx
import React, { useState } from "react";

const PoliceComplaintForm = () => {
  const [complaint, setComplaint] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Police Complaint Submitted: ${complaint}`);
    setComplaint("");
  };

  return (
    <div>
      <h2>Police Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter your complaint"
          rows="5"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PoliceComplaintForm;
