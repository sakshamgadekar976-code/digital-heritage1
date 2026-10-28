import "./Quiz.css";
import { useState } from "react";

function Quiz({ onBack, onComplete }) {
  const questions = [
    {
      question: "Which city is the Gateway of India located in?",
      options: ["Delhi", "Mumbai", "Pune", "Jaipur"],
      answer: "Mumbai"
    },
    {
      question: "Where is the Red Fort located?",
      options: ["Delhi", "Agra", "Mumbai", "Hyderabad"],
      answer: "Delhi"
    },
    {
      question: "Which site is famous for ancient rock-cut caves?",
      options: ["Hampi", "Ajanta Caves", "Sanchi Stupa", "Gateway of India"],
      answer: "Ajanta Caves"
    },
    {
      question: "Which place is known for its ancient Buddhist stupa?",
      options: ["Sanchi Stupa", "Red Fort", "Ellora Caves", "Hampi"],
      answer: "Sanchi Stupa"
    },
    {
      question: "What is the main purpose of Digital Heritage?",
      options: [
        "Preserving and exploring heritage digitally",
        "Selling historical objects",
        "Replacing museums",
        "Removing historical records"
      ],
      answer: "Preserving and exploring heritage digitally"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newScore =
      selectedAnswer === question.answer
        ? score + 1
        : score;

    setScore(newScore);

    if (currentQuestion === questions.length - 1) {
      setFinished(true);

      if (onComplete) {
        onComplete(newScore);
      }

      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  };

  if (finished) {
    return (
      <div className="quiz-page">

        <div className="quiz-result">

          <span className="quiz-icon">🏆</span>

          <p>HERITAGE QUIZ COMPLETED</p>

          <h1>Well Done!</h1>

          <h2>
            {score} / {questions.length}
          </h2>

          <span className="score-label">
            Your Heritage Knowledge Score
          </span>

          <div className="quiz-result-buttons">

            <button onClick={onBack}>
              ← Back to Home
            </button>

            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer("");
                setScore(0);
                setFinished(false);
              }}
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="quiz-page">

      <div className="quiz-header">

        <button
          className="quiz-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <p>DIGITAL HERITAGE LEARNING</p>

        <h1>Heritage Quiz</h1>

        <span>
          Test your knowledge of India's history and heritage.
        </span>

      </div>

      <div className="quiz-container">

        <div className="quiz-progress">

          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <div className="progress-bar">
            <div
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`
              }}
            ></div>
          </div>

        </div>

        <div className="quiz-card">

          <span className="question-number">
            QUESTION {currentQuestion + 1}
          </span>

          <h2>
            {question.question}
          </h2>

          <div className="quiz-options">

            {question.options.map((option) => (

              <button
                key={option}
                className={
                  selectedAnswer === option
                    ? "quiz-option selected"
                    : "quiz-option"
                }
                onClick={() =>
                  setSelectedAnswer(option)
                }
              >
                <span>
                  {selectedAnswer === option
                    ? "✓"
                    : "○"}
                </span>

                {option}

              </button>

            ))}

          </div>

          <button
            className="next-question"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Quiz;