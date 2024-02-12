import React from "react";

function ScoreCard({ score, onRestart }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-md h-48 w-[300px]  p-4 max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Quiz Completed!</h2>
        <p className="mb-6">Your Final Score: {score}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={onRestart}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default ScoreCard;
