// ViewScores.js
import React, { useState, useEffect } from "react";
import './ViewScores.css';

const ViewScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch scores from the backend (mock data used here)
    setScores([
      { student: "John Doe", score: 85 },
      { student: "Jane Smith", score: 92 },
      { student: "Tom Brown", score: 78 },
    ]);
  }, []);

  return (
    <div className="scores-container">
      <h2>Student Scores</h2>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, index) => (
            <tr key={index}>
              <td>{s.student}</td>
              <td>{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewScores;
