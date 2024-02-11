import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };
  return (
    <div className="flex justify-center items-center">
      {!start && <Welcome onStart={handleStart} />}
      {start && <QuestionCard />}
    </div>
  );
}

export default App;