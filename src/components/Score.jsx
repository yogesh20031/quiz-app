import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../feature/counter/counterSlice";
import { useNavigate } from "react-router-dom";

const Score = () => {
  const answer = useSelector((state) => state.counter.score);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePlayAgainClick() {
    dispatch(resetGame());
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-400 to-gray-700 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {/* Score Header */}
        <p className="text-2xl font-bold text-center text-gray-200 mb-4 relative py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-lg">
          Your Score
        </p>

        {/* Score */}
        <div className="mt-4 text-center text-4xl font-extrabold text-blue-400">
          {answer}
        </div>

        {/* Play Again Button */}
        <button
          onClick={handlePlayAgainClick}
          className="mt-6 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Score;
