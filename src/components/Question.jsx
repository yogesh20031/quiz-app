import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushResult, updateRepeat } from "../feature/counter/counterSlice";

const Question = (props) => {
  const dispatch = useDispatch();
  const stateAnswer = useSelector((state) => state.counter.results);

  const selectedAnswer = stateAnswer.find(
    (result) => result.quizQuestion.question === props.quizQuestion.question
  )?.answer;
  function handleOnChange(quizQuestion, value) {
    if (stateAnswer.length > 0) {
      const index = stateAnswer.findIndex(
        (result) => result.quizQuestion.question === quizQuestion.question
      );
      if (index !== -1) {
        const result = {
          quizQuestion: quizQuestion,
          answer: value,
        };
        dispatch(updateRepeat(result));
        return;
      }
    }
    const result = {
      quizQuestion: quizQuestion,
      answer: value,
    };
    dispatch(pushResult(result));
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-6">
      {/* Question */}
      <p className="text-2xl font-bold text-center text-gray-200 mb-4 relative py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-lg">
        {props.quizQuestion.question}
      </p>

      {/* Options */}
      <div className="mt-4 flex flex-col gap-3">
        {props.quizQuestion.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-600 peer-checked:bg-blue-500"
          >
            <input
              type="radio"
              value={option}
              name={`answer-${props.quizQuestion.question}`}
              className="hidden peer"
              onChange={() => handleOnChange(props.quizQuestion, option)}
              checked={selectedAnswer === option}
            />
            <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center transition-all peer-checked:border-blue-500 peer-checked:shadow-blue-500 peer-checked:shadow-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full scale-0 transition-all peer-checked:scale-100"></div>
            </div>
            <span className="text-gray-300 text-lg peer-checked:text-white peer-checked:font-semibold">
              {index + 1}: {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
