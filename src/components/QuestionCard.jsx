import { useState } from "react";
import { questions } from "../constants/Questions";

function QuestionCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptions = (value) => {
    setSelectedOption(value);
    console.log(value);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };
  console.log(currentQuestion);
  return (
    <div className="flex items-center justify-center h-screen ">
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
                  className={`mb-2 p-2 border rounded-md cursor-pointer ${
                    isOptionSelected ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptions(option)}
                >
                  {option}
                </li>
              );
            }
            return null;
          })}
        </ul>
        <button
          className="bg-blue-500 ml-[80%] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mt-4"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      </div>
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
