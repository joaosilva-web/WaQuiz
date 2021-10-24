import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useState, useEffect, useRef, FormEvent } from "react";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

interface QuestionProps {
  data: Question[];
  onAnswerUpdate: any;
  numberOfQuestions: any;
  activeQuestion: any;
  onSetActiveQuestion: any;
  onSetStep: any;
}

export function Question({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}: QuestionProps) {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef<any>();
  
  

  const changeHandler = (e: any) => {
    setSelected(e.target.value);
    if(error) {
        setError('');
    }
  };

  const nextClickHandler = (e: FormEvent) => {
    console.log("selected",selected);
    if (selected === "") {
      return setError("Please select one option");
    }
    onAnswerUpdate((prevState: any) => [
      ...prevState,
      { q: data[activeQuestion].question, a: selected },
    ]);
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
        findCheckedInput.checked = false;
    }
  },[changeHandler])

  return (
    <Card sx={{maxWidth: 784, display: 'flex', justifyContent: 'center', margin: "0 auto", textAlign: "center"}}>
      <CardContent>
        <div className="content">
            <Typography variant="h2" dangerouslySetInnerHTML={{__html: data[activeQuestion].question}}></Typography>
            <div className="control" ref={radiosWrapper}>
                {data[activeQuestion].incorrect_answers.concat(data[activeQuestion].correct_answer).sort().map((choice, i) => (
                    <label className="radio" key={i}>
                        <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                        {choice}
                    </label>
                ))}
            </div>
            {error && <div className="text-danger" style={{color: "red"}}>{error}</div>}
            <Button variant="contained" onClick={nextClickHandler}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
}
