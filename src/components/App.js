import { useEffect } from "react";
import Header from "./Header"
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const secondperquestion = 10;
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  Time: null
};
function reducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", Time: state.questions.length * secondperquestion };
    case "New answer":
      const question = state.questions.at(state.index);

      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points };
    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "Finish":
      return { ...state, status: "Finished", highscore: state.points > state.highscore ? state.points : state.highscore };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return { ...state, Time: state.Time - 1, status: state.Time === 0 ? "Finished" : state.status };
    default:
      throw new Error("unknown action");
  }
}
function App() {

  const [{ questions, status, index, answer, points, highscore, Time }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const MaxPoint = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:9000/questions").then(res => res.json()).then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === "active" &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} MaxPoint={MaxPoint} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer Time={Time} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === "Finished" && <FinishScreen points={points} MaxPoint={MaxPoint} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>

  );
}

export default App;
