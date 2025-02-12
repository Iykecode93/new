import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ExamPage.css";

const ExamPage = ({ studentClass }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        // Query Firestore to fetch subjects related to the student's class
        const q = query(collection(db, "exams"));
        const querySnapshot = await getDocs(q);

        // Extract unique subjects from Firestore
        const uniqueSubjects = [];
        querySnapshot.forEach((doc) => {
          const subject = doc.data().subject;
          if (subject && !uniqueSubjects.includes(subject)) {
            uniqueSubjects.push(subject);
          }
        });

        setSubjects(uniqueSubjects); // Set the subjects to state
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects(); // Call fetchSubjects on component mount
  }, [studentClass]);

  const handleSubjectSelection = (e) => {
    setSelectedSubject(e.target.value);
  };

  const startExam = () => {
    if (selectedSubject) {
      navigate(`/exam/${selectedSubject}`);
    } else {
      alert("Please select a subject.");
    }
  };

  return (
    <div className="exam-page">
      <h2>Select an Exam Subject</h2>
      {loading ? (
        <p>Loading subjects...</p>
      ) : (
        <>
          <select
            className="subject-dropdown"
            value={selectedSubject}
            onChange={handleSubjectSelection}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <button
            onClick={startExam}
            className="start-exam-btn"
            disabled={!selectedSubject}
          >
            Start Exam
          </button>
        </>
      )}
    </div>
  );
};

export default ExamPage;
