import { useState, useEffect, useContext} from "react";
import { Start } from "./components/Start";
import { Question } from "./components/Questions";
import { api } from "./services/api";
import "./app.css";
import { End } from "./components/End";
import { QuestionsAnsweredContext, QuestionsAnsweredProvider } from "./contexts/questionsAnsweredContext";

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
  const [step, setStep] =useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const [data, setData] = useState<Question[]>([]);
  const [time, setTime] = useState(0);

  const { answers } = useContext(QuestionsAnsweredContext)

  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
  },[step])

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() =>{
      setTime(prevTime => prevTime+1);
    }, 1000)
  }


  const finishClickHandler = () => {

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
    <QuestionsAnsweredProvider>

    <div className="App">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>}
      {step === 2 && <Question
        data={data}
        
        numberOfQuestions={data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
        />}
      {step === 3 && <End 
      results={answers}
      data={data}
      // onFinish={finishClickHandler}
      // onAnswersCheck={}
      time={time}
      />}
    </div>
    </QuestionsAnsweredProvider>
  )
}
