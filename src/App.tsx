import { useState, useEffect} from "react";
import { Start } from "./components/Start";
import { Question } from "./components/Questions";
import { api } from "./services/api";
import "./app.css";

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

export function App() {
  const [step, setStep] =useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [data, setData] = useState<Question[]>([]);

  const quizStartHandler = () => {
    setStep(2);
  }

  useEffect(() => {
    async function loadQuest() {
      const { data } = await api.get<ApiReceived>(
        `api.php?amount=${localStorage.getItem('questionsAmount')}`
        );
        setData(data.results);
        console.log(data.results);
    }
    loadQuest();
  },[step === 2]);
 

  return (
    <div className="App">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>}
      {step === 2 && <Question
        data={data}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
    </div>
  )
}
