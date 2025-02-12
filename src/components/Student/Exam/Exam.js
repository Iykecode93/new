import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import "./Exam.css";

const Exam = () => {
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch questions based on the subject
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "exams"),
          where("subject", "==", subject)
        );
        const querySnapshot = await getDocs(q);

        let fetchedQuestions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.questions) {
            fetchedQuestions = data.questions; // Assume questions are stored as an array
          }
        });

        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject]);

  // Handle answer change for each question
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setExamFinished(true);
      calculateScore();
    }
  };

  // Calculate score based on marks for each question
  const calculateScore = () => {
    let calculatedScore = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const correctAnswer = q.correctAnswer;

      // Compare answers and add the marks for correct answers
      if (
        userAnswer &&
        userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      ) {
        calculatedScore += q.marks; // Add marks for correct answer
      }
    });

    setScore(calculatedScore);
  };

  // Submit exam result to Firestore
  const handleSubmit = async () => {
    if (!name || !className) {
      alert("Please enter your name and class.");
      return;
    }

    try {
      await addDoc(collection(db, "examResults"), {
        name,
        class: className,
        subject,
        score,
        date: new Date(),
      });
      alert("Exam submitted successfully!");
      navigate("/view-scores", { state: { score, name, className, subject } });
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <div className="exam-container">
      <h2 className="exam-title">Exam: {subject}</h2>

      {loading ? (
        <p>Loading exam...</p>
      ) : examFinished ? (
        <div>
          <h3 className="exam-score">Your Final Score: {score}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input-field"
          />
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter your class"
            className="input-field"
          />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      ) : (
        <div>
          {questions.length > 0 && (
            <div>
              <p className="question-text">
                <span className="question-number">
                  {currentQuestionIndex + 1}:
                </span>
                {questions[currentQuestionIndex].question}
              </p>
              {/* Map through options and display as radio buttons */}
              <div>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label key={index} className="option-label">
                      <input
                        type="checkbox"
                        name={`question-${questions[currentQuestionIndex].id}`}
                        value={option}
                        checked={answers[
                          questions[currentQuestionIndex].id
                        ]?.includes(option)}
                        onChange={(e) =>
                          handleAnswerChange(
                            questions[currentQuestionIndex].id,
                            e.target.value,
                            e.target.checked
                          )
                        }
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          )}

          <button className="next-button" onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Exam;
