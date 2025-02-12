import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
// import Login from "./components/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentLogin from "./components/Student/StudentLogin";
import ExamPage from "./components/Student/ExamPage";
import ViewScores from "./components/Student/ViewScore";
import TeacherLogin from "./components/Teacher/TeacherLogin";
import CreateExam from "./components/Teacher/CreateExam";
import ViewStudentScores from "./components/Teacher/ViewStudentScores";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageStudents from './components/Admin/ManageStudents';
import ManageTeachers from './components/Admin/ManageTeachers';
import ViewStudentsList from './components/Admin/ViewStudentList';
import ViewTeachersList from './components/Admin/ViewTeachersList';
import ViewExamsScore from './components/Admin/ViewExamsScore';
import Footer from './components/Footer/Footer';
import Exam from './components/Student/Exam/Exam';

// Main App component with routing setup
function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/take-exam" element={<ExamPage />} />
          <Route path="/view-scores" element={<ViewScores />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/create-exam" element={<CreateExam />} />
          <Route path="/teacher/view-scores" element={<ViewStudentScores />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/manageStudents" element={<ManageStudents />} />
          <Route path="/manageTeachers" element={<ManageTeachers />} />
          <Route path="/viewStudentsList" element={<ViewStudentsList />} />
          <Route path="/viewTeachersList" element={<ViewTeachersList />} />
          <Route path="/viewExamsScore" element={<ViewExamsScore />} />
          <Route path="/exam/:subject" element={<Exam />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
