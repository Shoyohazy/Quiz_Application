import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./constants/Questions";

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };
  const onFinish = () => {
    setStart(true);
  };
  return (
    <div className="flex justify-center items-center">
      {!start ? (
        <Welcome onStart={handleStart} />
      ) : (
        <QuestionCard questions={questions} onFinish={onFinish} />
      )}
    </div>
  );
}

export default App;
