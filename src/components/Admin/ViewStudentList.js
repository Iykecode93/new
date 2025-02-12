import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ViewStudentList.css";

const AdminViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    email: "",
    studentClass: "",
    password: "", // Add password to the edit form
  });

  const StudentsCollectionRef = collection(db, "students");

  // Fetch students from Firestore and sort alphabetically by name
  const fetchStudents = async () => {
    const data = await getDocs(StudentsCollectionRef);
    const studentsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // Sort students alphabetically by name
    studentsData.sort((a, b) => a.name.localeCompare(b.name));

    setStudents(studentsData);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    const studentDoc = doc(db, "students", id);
    await deleteDoc(studentDoc);
    fetchStudents(); // Refresh the student list after deletion
  };

  // Handle edit action
  const handleEdit = (student) => {
    setEditForm({
      id: student.id,
      name: student.name,
      email: student.email,
      studentClass: student.studentClass,
      password: student.password || "", // Include password for editing
    });
  };

  // Handle update action
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, name, email, studentClass, password } = editForm;

    if (id) {
      const studentDoc = doc(db, "students", id);
      await updateDoc(studentDoc, { name, email, studentClass, password }); // Update password in Firestore
      fetchStudents(); // Refresh the student list after update
      setEditForm({ id: null, name: "", email: "", studentClass: "", password: "" }); // Clear the form
    }
  };

  // Handle input change for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="manage-students-container">
      <h2>View Registered Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students registered yet.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.studentClass}</td>
                <td>{student.password || "Not set"}</td> {/* Display password */}
                <td>
                  <button
                    onClick={() => handleEdit(student)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Form */}
      {editForm.id && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Edit Student</h3>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editForm.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editForm.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="studentClass">Class:</label>
          <input
            type="text"
            id="studentClass"
            name="studentClass"
            value={editForm.studentClass}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={editForm.password}
            onChange={handleInputChange}
          />

          <button type="submit" className="form-btn">
            Update Student
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminViewStudents;
