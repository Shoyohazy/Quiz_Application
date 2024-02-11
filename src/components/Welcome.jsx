import logo from "../assets/trivia_logo.jpg";

function Welcome({ onStart }) {
  return (
    <div className="flex items-center justify-between flex-col h-screen">
      <img src={logo} alt="" />
      <div className="bg-gray-100 shadow-lg rounded-md p-8 max-w-lg mb-[30%]">
        <h1 className="text-[4rem] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text italic font-bold mb-4">
          Welcome to the Trivia!
        </h1>
        <p className="text-gray-600 font-medium text-2xl mb-8">
          Test your knowledge and have fun with our quiz. Good luck!
        </p>
        <button
          onClick={onStart}
          className="bg-blue-500 text-lg font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Welcome;
