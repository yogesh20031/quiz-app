import { createSlice } from "@reduxjs/toolkit";
import Question from "../../components/Question";

const initialState = {
  results: [],
  score: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    pushResult: (state, action) => {
      const result = action.payload;
      state.results.push(result);
    },
    updateRepeat: (state, action) => {
      const result = action.payload;
      const index = state.results.findIndex(
        (stateVar) =>
          stateVar.quizQuestion.question === result.quizQuestion.question
      );
      if (index !== -1) {
        state.results[index] = result;
      }
    },
    scoreIncrease: (state) => {
      state.score += 1;
    },
    resetGame: (state) => {
      state.score = 0;
      state.results = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushResult, updateRepeat, scoreIncrease, resetGame } =
  counterSlice.actions;

export default counterSlice.reducer;
