import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ManageStudents.css";

const AdminViewExamScores = () => {
  const [students, setStudents] = useState([]);

  const StudentsCollectionRef = collection(db, "students");

  // Fetch students and their exam scores from Firestore
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

  return (
    <div className="manage-students-container">
      <h2>View Students' Exam Scores</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Exam Scores</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students registered yet.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.studentClass}</td>
                <td>
                  {/* Displaying the exam score(s) */}
                  {student.examScores ? (
                    Array.isArray(student.examScores) ? (
                      student.examScores.map((score, index) => (
                        <div key={index}>Exam {index + 1}: {score}</div>
                      ))
                    ) : (
                      <div>{student.examScores}</div>
                    )
                  ) : (
                    <div>No scores available</div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewExamScores;
