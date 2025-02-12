import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ViewScores.css';

const ViewScores = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get score and other details from location.state
  const { score, studentName, studentClass, subject } = location.state || {};

  // Redirect if score or data is missing
  if (!score) {
    navigate("/"); // Redirect to the home page or any fallback page if no score is found
  }

  return (
    <div className="score-container">
      <h2>Exam Result</h2>
      {score !== undefined ? (
        <div className="score">
          <p><strong>Student Name:</strong> {studentName}</p>
          <p><strong>Class:</strong> {studentClass}</p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Your Score:</strong> {score}</p>
        </div>
      ) : (
        <p>Unable to fetch your score. Please try again later.</p>
      )}
    </div>
  );
};

export default ViewScores;
