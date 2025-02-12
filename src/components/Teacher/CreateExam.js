import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import './CreateExam.css';

const CreateExam = () => {
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState(""); // Exam date input
  const [examStartTime, setExamStartTime] = useState(""); // Exam start time input
  const [examEndTime, setExamEndTime] = useState(""); // Exam end time input
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      question: "", 
      options: ["", "", "", "", ""], 
      correctAnswer: "", 
      marks: 1 
    }
  ]);

  // Handle question changes
  const handleQuestionChange = (id, field, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  // Handle changes in options
  const handleOptionChange = (id, optionIndex, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id
        ? {
            ...q,
            options: q.options.map((opt, index) =>
              index === optionIndex ? value : opt
            ),
          }
        : q
    );
    setQuestions(updatedQuestions);
  };

  // Handle changes in the correct answer
  const handleCorrectAnswerChange = (id, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, correctAnswer: value } : q
    );
    setQuestions(updatedQuestions);
  };

  // Handle changes in marks
  const handleMarksChange = (id, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, marks: value } : q
    );
    setQuestions(updatedQuestions);
  };

  // Add a new question with 5 options and marks
  const addQuestion = () => {
    const newId = questions.length ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      { 
        id: newId, 
        question: "", 
        options: ["", "", "", "", ""], 
        correctAnswer: "", 
        marks: 1 
      }
    ]);
  };

  // Convert the exam date and time into a timestamp
  const getExamTimestamp = () => {
    const date = new Date(`${examDate}T${examStartTime}`);
    return Timestamp.fromDate(date);
  };

  // Submit the form to create the exam
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const examTimestamp = getExamTimestamp(); // Get the timestamp

      // Save exam data to Firebase
      await addDoc(collection(db, "exams"), {
        classLevel,
        subject,
        examDate,
        examStartTime,
        examEndTime,
        examTimestamp, // Store timestamp for the exam
        questions,
      });

      alert("Exam created successfully!");
      setClassLevel("");
      setSubject("");
      setExamDate("");
      setExamStartTime("");
      setExamEndTime("");
      setQuestions([{ id: 1, question: "", options: ["", "", "", "", ""], correctAnswer: "", marks: 1 }]);
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div className="create-exam-container">
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit} className="create-exam-form">
        <div className="form-group">
          <label htmlFor="classLevel">Class Level:</label>
          <input
            type="text"
            id="classLevel"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="examDate">Exam Date:</label>
          <input
            type="date"
            id="examDate"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="examStartTime">Exam Start Time:</label>
          <input
            type="time"
            id="examStartTime"
            value={examStartTime}
            onChange={(e) => setExamStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="examEndTime">Exam End Time:</label>
          <input
            type="time"
            id="examEndTime"
            value={examEndTime}
            onChange={(e) => setExamEndTime(e.target.value)}
            required
          />
        </div>
        <h3>Questions</h3>
        {questions.map((q) => (
          <div key={q.id} className="question">
            <label>Question {q.id}:</label>
            <input
              type="text"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(q.id, "question", e.target.value)}
              required
            />
            <h4>Answer Options:</h4>
            {q.options.map((option, index) => (
              <div key={index} className="answer-option">
                <label>Option {index + 1}:</label>
                <input
                  type="text"
                  placeholder={`Enter option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(q.id, index, e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <h4>Select Correct Answer:</h4>
            <select
              value={q.correctAnswer}
              onChange={(e) =>
                handleCorrectAnswerChange(q.id, e.target.value)
              }
              required
            >
              <option value="">Select the correct answer</option>
              {q.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <h4>Marks for this Question:</h4>
            <input
              type="number"
              min="1"
              value={q.marks}
              onChange={(e) => handleMarksChange(q.id, Number(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="add-question-btn">
          Add Question
        </button>
        <button type="submit" className="submit-btn">Save Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;
