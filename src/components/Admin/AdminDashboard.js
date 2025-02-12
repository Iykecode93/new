import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h2>Welcome to the Admin Dashboard</h2>
      <p>Manage students, teachers, and exam scores efficiently.</p>
      <div className="dashboard-links">
        <Link to="/manageStudents" className="dashboard-btn">
          Manage Students
        </Link>
        <Link to="/manageTeachers" className="dashboard-btn">
          Manage Teachers
        </Link>
        <Link to="/viewStudentsList" className="dashboard-btn">
          View Student List
        </Link>
        <Link to="/viewTeachersList" className="dashboard-btn">
          View Teacher List
        </Link>
        <Link to="/viewExamsScore" className="dashboard-btn">
          View Exam Scores
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
