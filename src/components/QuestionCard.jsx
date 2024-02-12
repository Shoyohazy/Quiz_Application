import { useEffect, useState } from "react";

import ScoreCard from "./ScoreCard";

function QuestionCard({ questions, onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedQuestionIndex = localStorage.getItem("quizQuestionIndex");
    const savedScore = localStorage.getItem("quizScore");
    console.log("savedQuestionIndex:", savedQuestionIndex);
    console.log("savedScore:", savedScore);

    if (savedQuestionIndex !== null && savedScore !== null) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  useEffect(() => {
    // Save quiz progress to localStorage on state change
    console.log("useEffect: Component mounted");
    localStorage.setItem("quizQuestionIndex", currentQuestionIndex.toString());
    localStorage.setItem("quizScore", score.toString());
  }, [currentQuestionIndex, score]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Find the correct option
    const selectedOptionKey = Object.keys(currentQuestion).find(
      (key) =>
        key !== "question" &&
        key !== "answer" &&
        currentQuestion[key] === selectedOption
    );
    console.log(selectedOptionKey);

    // Handle user's response and move to the next question
    if (selectedOptionKey == currentQuestion.answer) {
      // Increment the score
      setScore((prevScore) => prevScore + 1);
    }

    // Reset selected option
    setSelectedOption(null);

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Clear quiz progress from localStorage on quiz completion
      localStorage.removeItem("quizQuestionIndex");
      localStorage.removeItem("quizScore");
    }
  };

  const restartQuiz = () => {
    // Reset the quiz state
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    // Clear quiz progress from localStorage on restart
    localStorage.removeItem("quizQuestionIndex");
    localStorage.removeItem("quizScore");
    onFinish();
  };

  return (
    <div>
      {currentQuestionIndex < questions.length - 1 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white shadow-md rounded-md p-8 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
              {currentQuestion.question}
            </h2>
            <ul className="list-none p-0">
              {Object.keys(currentQuestion).map((key) => {
                // Filter out non-option keys
                if (key !== "question" && key !== "answer") {
                  const option = currentQuestion[key];
                  const isOptionSelected = selectedOption === option;

                  return (
                    <li
                      key={key}
                      className={`mb-2 p-2 border rounded-md cursor-pointer ${
                        isOptionSelected ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <p className="mt-4">Score: {score}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mt-4"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <ScoreCard
          score={score}
          totalQuestions={questions.length}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default QuestionCard;

// ${
//   isOptionSelected ? "bg-blue-100" : "hover:bg-gray-100"
// }
// ${
//   isOptionSelected ? "bg-blue-100" : "hover:bg-gray-100"
// }
