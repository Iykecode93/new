import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { db, auth } from "../../firebaseConfig"; // Ensure firebaseConfig includes both db and auth setup
import "./ManageStudents.css";

const AdminManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    studentClass: "",
  });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const studentsCollectionRef = collection(db, "students");

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const data = await getDocs(studentsCollectionRef);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addOrUpdateStudent = async (e) => {
    e.preventDefault();

    if (editId) {
      // Update student in Firestore
      const studentDoc = doc(db, "students", editId);
      await updateDoc(studentDoc, form);
      fetchStudents();
      setEditId(null);
    } else {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const userId = userCredential.user.uid;

        // Add student details to Firestore
        await addDoc(studentsCollectionRef, { ...form, authId: userId });
      } catch (error) {
        console.error("Error creating student:", error.message);
        alert("Error creating student. Please try again.");
        return;
      }
    }

    setForm({
      name: "",
      email: "",
      username: "",
      password: "",
      studentClass: "",
    });
    fetchStudents();
  };

  const deleteStudent = async (id, authId) => {
    try {
      // Delete student from Firestore
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);

      // Delete user from Firebase Authentication
      const user = await auth.getUser(authId); // Ensure authId is stored in Firestore
      if (user) {
        await deleteUser(user);
      }
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }

    fetchStudents();
  };

  const editStudent = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  return (
    <div className="manage-students-container">
      <h2>Manage Students</h2>
      <form onSubmit={addOrUpdateStudent} className="student-form">
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
        <label htmlFor="studentClass">Class:</label>
        <select
          id="studentClass"
          name="studentClass"
          value={form.studentClass}
          onChange={handleInputChange}
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

        <button type="submit" className="form-btn">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AdminManageStudents;
