import { useEffect, useState } from "react";
import Question from "./Question";
import { fetchQuestions } from "../api/trivia.js";
import "../styles/Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswerSelected={handleAnswerSelected}
          onNextQuestion={handleNextQuestion}
        />
      ) : (
        <div>
          <h1>Quiz Finished!</h1>
          <p className="score-display">Your score: {score}</p>
          <button
            className="restart-button"
            onClick={() => window.location.reload()}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
