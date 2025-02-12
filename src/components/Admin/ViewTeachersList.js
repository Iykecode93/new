import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ViewTeachersList.css";

const AdminViewStudents = () => {
  const [teachers, setTeachers] = useState([]);
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    email: "",
    subject: "",
    password: "", // Add password to the edit form
  });

  const TeachersCollectionRef = collection(db, "teachers");

  const fetchTeachers = async () => {
    const data = await getDocs(TeachersCollectionRef);
    const teachersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    teachersData.sort((a, b) => a.name.localeCompare(b.name));

    setTeachers(teachersData);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    const teacherDoc = doc(db, "teachers", id);
    await deleteDoc(teacherDoc);
    fetchTeachers(); // Refresh the student list after deletion
  };

  // Handle edit action
  const handleEdit = (teacher) => {
    setEditForm({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      password: teacher.password || "", // Include password for editing
    });
  };

  // Handle update action
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, name, email, subject, password } = editForm;

    if (id) {
      const teacherDoc = doc(db, "teachers", id);
      await updateDoc(teacherDoc, { name, email, subject, password }); // Update password in Firestore
      fetchTeachers(); // Refresh the student list after update
      setEditForm({ id: null, name: "", email: "", subject: "", password: "" }); // Clear the form
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
            <th>Subject</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="5">No teachers registered yet.</td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.password || "Not set"}</td> {/* Display password */}
                <td>
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
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
          <h3>Edit Teacher</h3>
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

          <label htmlFor="subject">Class:</label>
          <input
            type="text"
            id="studentClass"
            name="studentClass"
            value={editForm.subject}
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
            Update Teacher
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminViewStudents;
