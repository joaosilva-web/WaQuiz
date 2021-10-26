import { useState, useEffect, useContext } from "react";
import { Start } from "./components/Start";
import { Question } from "./components/Questions";
import { api } from "./services/api";
import "./app.css";
import { End } from "./components/End";
import {
  QuestionsAnsweredContext,
  QuestionsAnsweredProvider,
} from "./contexts/questionsAnsweredContext";
import { Modal } from "./components/Modal";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import logo from "./logo.svg"

interface ApiReceived {
  response_code: number;
  results: [Question];
}
interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

let interval: number;

export function App() {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [data, setData] = useState<Question[]>([]);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { answers, setAnswers } = useContext(QuestionsAnsweredContext);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    let nextStep = confirm("Do you want to continue?");

    if (nextStep) {
      setStep(2);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setStep(1);
    }
  };

  const finishClickHandler = () => {
    localStorage.removeItem("questionAmount");
    window.location.reload();
  };

  useEffect(() => {
    async function loadQuest() {
      const { data } = await api.get<ApiReceived>(
        `api.php?amount=${localStorage.getItem("questionsAmount")}`
      );
      setData(data.results);
    }
    loadQuest();
    console.log("data app: ", data);
  }, [step === 1]);

  return (
    <ThemeProvider theme={theme}>
      <QuestionsAnsweredProvider>
        <header><img src={logo} alt="Wa Quiz." style={{margin: 10}}/></header>
        <div className="App">
          {step === 1 && <Start onQuizStart={quizStartHandler} />}
          {step === 2 && (
            <Question
              data={data}
              numberOfQuestions={data.length}
              activeQuestion={activeQuestion}
              onSetActiveQuestion={setActiveQuestion}
              onSetStep={setStep}
            />
          )}
          {step === 3 && (
            <End
              results={answers}
              data={data}
              onFinish={finishClickHandler}
              onAnswersCheck={() => setShowModal(true)}
              time={time}
            />
          )}

          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              results={answers}
              data={data}
            />
          )}
        </div>
      </QuestionsAnsweredProvider>
    </ThemeProvider>
  );
}
