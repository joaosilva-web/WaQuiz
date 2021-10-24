import { useState, useEffect} from "react";
import { Start } from "./components/Start";
import { Question } from "./components/Questions";
import "./app.css";

export function App() {
  const [step, setStep] =useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const quizStartHandler = () => {
    setStep(2);
  }

  return (
    <div className="App">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>}
      {step === 2 && <Question/>}
    </div>
  )
}
