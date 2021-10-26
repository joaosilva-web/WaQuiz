import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { QuestionsAnsweredContext } from "../../contexts/questionsAnsweredContext";

import { formatTime } from "../../utils";

export function End({ data, time, onFinish, onAnswersCheck }: any) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { answers } = useContext(QuestionsAnsweredContext);
  console.log("results", answers);

  useEffect(() => {
    let correct = 0;
    answers.forEach((result: any, index: any) => {
      // console.log("item",result.a);
      console.log("resposta", data[index].correct_answer);
      if (result.a === data[index].correct_answer) {
        correct++;
        console.log("corrrect:", correct);
      }
    });
    setCorrectAnswers(correct);
    localStorage.setItem("result", JSON.stringify(answers));
    localStorage.setItem("questions", JSON.stringify(data));
  }, []);
  // console.log("correctAnswers:", correctAnswers);

  return (
    <Card sx={{ minWidth: "784px" }}>
      <CardContent>
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Your results</Typography>
          <Typography variant="body1">
            {correctAnswers} of {data.length}
          </Typography>
          <Typography variant="body1">
            <strong>
              {Math.floor(
                (correctAnswers /
                  parseInt(localStorage.getItem("questionsAmount") as string)) *
                  100
              )}
              %
            </strong>
          </Typography>
          <Typography variant="body1" component="strong">
            <strong>Your time:</strong> {formatTime(time)}
          </Typography>
          <Container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "0",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "45%" }}
              onClick={onAnswersCheck}
            >
              Check answers
            </Button>
            <Button
              variant="contained"
              sx={{ width: "45%" }}
              onClick={onFinish}
            >
              Finish quiz
            </Button>
          </Container>
        </div>
      </CardContent>
    </Card>
  );
}
