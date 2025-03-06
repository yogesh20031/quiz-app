import React, { useState } from "react";
import { quizQuestion } from "../data/data";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { scoreIncrease } from "../feature/counter/counterSlice";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const ContexOfQuiz = () => {
  const [resultTimmer, setResultTimmer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [viewScore, setViewScore] = useState(false);
  const answers = useSelector((state) => state.counter.results);
  const score = useSelector((state) => state.counter.score);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function checkAnswer() {
    if (!answers[currentQuestionIndex]) return false;
    const userAnswer = answers[currentQuestionIndex].answer;
    const correctAnswer = answers[currentQuestionIndex].quizQuestion.answer;

    return userAnswer === correctAnswer;
  }

  function handleClick() {
    if (!answers[currentQuestionIndex]) {
      alert("select answer");
      return;
    }
    const correct = checkAnswer();
    setIsCorrect(correct);
    if (correct) dispatch(scoreIncrease());

    setResultTimmer(true);
    setTimeout(() => {
      setResultTimmer(false);
      // if (answers.length > currentQuestionIndex)
      if (currentQuestionIndex + 1 < quizQuestion.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsCorrect(null);
      } else {
        setViewScore(true);
        navigate("/score");
      }
    }, 1500);
  }

  return (
    <div className="bg-gradient-to-br from-blue-300 via-purple-400 to-gray-700 min-h-screen flex flex-col items-center justify-center py-10 px-6">
      {/* Heading */}
      <p className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text shadow-lg p-4 rounded-lg mb-6">
        Challenge Yourself, Be the Quiz Champion! 🏆
      </p>
      {/* Quiz Box */}
      <div className="w-full max-w-3xl bg-gray-900 text-white p-6 rounded-2xl shadow-2xl border border-gray-700">
        <Question
          currentIndex={currentQuestionIndex}
          quizQuestion={quizQuestion[currentQuestionIndex]}
        />
      </div>
      {/* Submit Button */}
      <button
        onClick={handleClick}
        className="mt-6 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
      >
        Submit 🚀
      </button>
      {!viewScore ? (
        ""
      ) : (
        <button className="mt-6 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all hover:bg-blue-500 hover:scale-105 active:scale-95">
          <NavLink to="/score">View Result </NavLink>
        </button>
      )}
      {/* Answer Result */}
      {resultTimmer && (
        <p
          className={`mt-4 text-2xl font-semibold transition-all duration-300 ${
            checkAnswer() ? "text-green-400" : "text-red-400"
          }`}
        >
          {checkAnswer() ? "✅ Correct Answer!" : "❌ Incorrect Answer!"}
        </p>
      )}
    </div>
  );
};

export default ContexOfQuiz;
