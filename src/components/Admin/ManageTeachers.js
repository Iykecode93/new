import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ManageTeachers.css";

const AdminManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    subject: "",
  });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const TeachersCollectionRef = collection(db, "teachers");

  // Fetch teachers from Firestore
  const fetchTeachers = async () => {
    const data = await getDocs(TeachersCollectionRef);
    setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addOrUpdateTeacher = async (e) => {
    e.preventDefault();
    if (editId) {
      const teacherDoc = doc(db, "teachers", editId);
      await updateDoc(teacherDoc, form);
    } else {
      await addDoc(TeachersCollectionRef, form);
    }
    fetchTeachers();
    setForm({ name: "", email: "", username: "", password: "", subject: "" });
    setEditId(null);
  };

  const deleteTeacher = async (id) => {
    const teacherDoc = doc(db, "teachers", id);
    await deleteDoc(teacherDoc);
    fetchTeachers();
  };

  const editTeacher = (teacher) => {
    setForm(teacher);
    setEditId(teacher.id);
  };

  // Nigerian School Subjects
  const subjects = [
    "Mathematics",
    "English Language",
    "Science",
    "Social Studies",
    "Civic Education",
    "Agricultural Science",
    "Home Economics",
    "Computer Studies",
    "Physical Education",
    "Business Studies",
    "Geography",
    "History",
    "Religious Studies",
    "Economics",
    "Government",
    "Physics",
    "Chemistry",
    "Biology",
    "Fine Arts",
    "Music",
    "Technical Drawing",
  ];

  return (
    <div className="manage-students-container">
      <h2>Manage Teachers</h2>
      <form onSubmit={addOrUpdateTeacher} className="student-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleInputChange}
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

        <button type="submit" className="form-btn">
          {editId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>
    </div>
  );
};

export default AdminManageTeachers;
