import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { useState, useEffect, useRef, FormEvent, useContext } from "react";
import { QuestionsAnsweredContext } from "../../contexts/questionsAnsweredContext";

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
  numberOfQuestions: any;
  activeQuestion: any;
  onSetActiveQuestion: any;
  onSetStep: any;
}

export function Question({
  data,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}: QuestionProps) {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef<any>();
  const { answers, setAnswers } = useContext(QuestionsAnsweredContext);

  const changeHandler = (e: any) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = (e: FormEvent) => {
    if (selected === "") {
      return setError("Please select one option");
    } else {
      setAnswers([
        ...answers,
        { q: data[activeQuestion].question, a: selected },
      ]);
    }
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data[activeQuestion]]);

  return (
    <Card
      sx={{
        maxWidth: 784,
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <CardContent>
        <div className="content">
          <Typography
            variant="h2"
            dangerouslySetInnerHTML={{ __html: data[activeQuestion].question }}
          ></Typography>
          <div className="control" ref={radiosWrapper}>
            {data[activeQuestion].incorrect_answers
              .concat(data[activeQuestion].correct_answer)
              .sort()
              .map((choice, i) => (
                <label className="radio" key={i}>
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    onChange={changeHandler}
                  />
                  {choice}
                </label>
              ))}
          </div>
          {error && (
            <Typography variant="body2" color="error">
              {" "}
              {error}
            </Typography>
          )}
          <Button variant="contained" onClick={nextClickHandler}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
