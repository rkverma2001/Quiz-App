import { useEffect, useState } from "react";
import "../styles/Question.css";

const Question = ({ question, onAnswerSelected, onNextQuestion }) => {
  const [timer, setTimer] = useState(15);
  const [answers, setAnswers] = useState([]);

  const shuffleAnswers = (answers) =>
    [...answers].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setAnswers(
      shuffleAnswers([question.correct_answer, ...question.incorrect_answers])
    );
  }, [question]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval);
          onNextQuestion();
          return 15;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [onNextQuestion]);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setAnswers((currentAnswers) => shuffleAnswers(currentAnswers));
    }, 5000);

    return () => clearInterval(shuffleInterval);
  }, [answers]);

  const handleAnswerClick = (answer) => {
    onAnswerSelected(answer === question.correct_answer);
    setTimer(15);
  };

  const handleSkipQuestion = () => {
    setTimer(15);
    onNextQuestion();
  };

  return (
    <div className="question-container">
      <h2 className="question-title">{question.question}</h2>
      <div className="timer">Time left: {timer} seconds</div>
      {answers.map((answer, index) => (
        <button
          key={index}
          className="answer-button"
          onClick={() => handleAnswerClick(answer)}
        >
          {answer}
        </button>
      ))}
      <button className="skip-button" onClick={handleSkipQuestion}>
        Skip Question
      </button>
    </div>
  );
};

export default Question;
