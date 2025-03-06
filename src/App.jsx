import "./App.css";
import ContexOfQuiz from "./components/ContexOfQuiz";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Score from "./components/Score";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ContexOfQuiz />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
