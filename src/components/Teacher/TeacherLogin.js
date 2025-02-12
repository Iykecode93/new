import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./TeachersLogin.css";

const TeacherLogin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState(""); // State for the subject input
  const [error, setError] = useState(""); // State for error message
  const [teachers, setTeachers] = useState([]); // Store teachers data
  const navigate = useNavigate();

  // Fetch teacher data from Firestore
  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersCollectionRef = collection(db, "teachers");
      const data = await getDocs(teachersCollectionRef);
      setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchTeachers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate login credentials and subject
    const teacher = teachers.find(
      (t) =>
        (t.email === emailOrUsername || t.username === emailOrUsername) &&
        t.password === password &&
        t.subject === subject
    );

    if (teacher) {
      setError(""); // Clear any previous errors
      // Redirect to the dashboard and optionally pass teacher data
      navigate("/teacherDashboard", { state: { teacher } });
    } else {
      setError("Invalid email/username, password, or subject!"); // Set error message
    }
  };

  const subjects = [
    "Mathematics", "English Language", "Science", "Social Studies", "Civic Education",
    "Agricultural Science", "Home Economics", "Computer Studies", "Physical Education",
    "Business Studies", "Geography", "History", "Religious Studies", "Economics",
    "Government", "Physics", "Chemistry", "Biology", "Fine Arts", "Music", "Technical Drawing"
  ];

  return (
    <div className="teachers-login-container">
      <h2>Teacher's Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="emailOrUsername">Email:</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Subject
          </option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Show error message */}
    </div>
  );
};

export default TeacherLogin;
