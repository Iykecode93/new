import React from "react";
import { Link } from "react-router-dom";
import "./StudentDash.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-container">
      <h2>Welcome to the Student Dashboard</h2>
      <p>Navigate through your portal to take exams, view scores, and more!</p>
      <div className="dashboard-links">
        <Link to="/take-exam" className="dashboard-btn">
          Take Exam
        </Link>
        <Link to="/view-scores" className="dashboard-btn">
          View Scores
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
