import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./StudentsLogin.css";

const StudentLogin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch student data from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollectionRef = collection(db, "students");
        const data = await getDocs(studentsCollectionRef);
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false); // Mark as done loading
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch students. Try again later.");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (loading) {
      setError("Loading student data. Please wait...");
      return;
    }

    // Validate login credentials
    const student = students.find(
      (s) =>
        (s.email?.toLowerCase() === emailOrUsername.toLowerCase() ||
          s.username?.toLowerCase() === emailOrUsername.toLowerCase()) &&
        s.password === password &&
        s.studentClass?.toLowerCase() === studentClass.toLowerCase()
    );

    if (student) {
      setError("");
      console.log("Logged in student:", student); // Debugging
      navigate("/studentDashboard", { state: { student } });
    } else {
      setError("Invalid email/username, password, or class!");
    }
  };

  return (
    <div className="student-login-container">
      <h2 className="student-login-title">Student Login</h2>
      <form onSubmit={handleLogin} className="student-login-form">
        <div className="student-login-form-group">
          <label htmlFor="emailOrUsername" className="student-login-label">Email or Username:</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="student-login-input"
            required
          />
        </div>
        <div className="student-login-form-group">
          <label htmlFor="password" className="student-login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="student-login-input"
            required
          />
        </div>
        <div className="student-login-form-group">
          <label htmlFor="studentClass" className="student-login-label">Class:</label>
          <select
            id="studentClass"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="student-login-select"
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
            <option value="Primary 6">Primary 6</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
            <option value="SSS 1">SSS 1</option>
            <option value="SSS 2">SSS 2</option>
            <option value="SSS 3">SSS 3</option>
          </select>
        </div>
        <button type="submit" className="student-login-btn" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <p className="student-login-error">{error}</p>}
    </div>
  );
};

export default StudentLogin;
