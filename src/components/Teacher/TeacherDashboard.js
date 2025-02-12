// TeacherDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome to the Teacher's Dashboard</h2>
      <p>
        Navigate through your portal to create exams, view scores, and more!
      </p>
      <div className="dashboard-links">
        <Link to="/teacher/create-exam" className="dashboard-btn">
          Create Exam
        </Link>
        <Link to="/teacher/view-scores" className="dashboard-btn">
          View Scores
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
