import { useEffect, useState } from "react";
import { questions } from "../constants/Questions";
import ScoreCard from "./ScoreCard";

function QuestionCard({ onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Load the score from localStorage on component mount
    const savedScore = localStorage.getItem("quizScore");
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleOptions = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  const handleAnswer = () => {
    const correctOption = Object.keys(currentQuestion).find((key) => {
      if (
        key !== "question" &&
        key !== "answer" &&
        key == currentQuestion.answer
      ) {
        return currentQuestion[key];
      }
    });
    console.log(correctOption);
    if (selectedOption == currentQuestion[correctOption]) {
      console.log("update score in local Storage");
      setScore((prevScore) => prevScore + 1);
      localStorage.setItem("quizScore", score.toString());
    }
    setSelectedOption(null);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    localStorage.removeItem("quizScore");
    onFinish();
  };
  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <div className={`flex items-center justify-center h-screen `}>
          <div className="bg-white shadow-md rounded-md p-4 max-w-lg">
            <h2 className="text-3xl font-semibold mb-4">
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
                      className={`mb-2 p-2 border rounded-md cursor-pointer  ${
                        isOptionSelected ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleOptions(option, key)}
                    >
                      {option}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <div className="flex max-w-md">
              <button
                onClick={handleAnswer}
                className="bg-blue-500 ml-[15%] max-w-md  text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mt-4"
              >
                Answer
              </button>
              <button
                className="bg-blue-500 ml-[10%] max-w-md  text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mt-4"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ScoreCard score={score} onRestart={resetQuiz} />
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
