import { Button, Card, CardContent, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { QuestionsAnsweredContext } from '../../contexts/questionsAnsweredContext';

import { formatTime } from "../../utils";


export function End({ data, time, onFinish, onAnswersCheck }: any) {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const { answers } = useContext(QuestionsAnsweredContext);
    // console.log("results",answers);

    useEffect(() => {
        let correct = 0;
        answers.forEach((result: any, index: any) => {
            // console.log("item",result.a);
            // console.log("resposta",data[index].correct_answer);
            if(result.a === data[index].correct_answer) {
                correct++;
                console.log("corrrect:",correct);
            }
        });
        setCorrectAnswers(correct);
    },[])
    // console.log("correctAnswers:", correctAnswers);

    return(
            <Card>
                <CardContent>
                    <div className="content" style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                        <Typography variant="h3">Your results</Typography>
                        <Typography variant="body1">{correctAnswers} of {data.length}</Typography>
                        <Typography variant="body1"><strong>{Math.floor((correctAnswers / parseInt(localStorage.getItem("questionsAmount") as string)) * 100)}%</strong></Typography>
                        <Typography variant="body1" component="strong"><strong>Your time:</strong> {formatTime(time)}</Typography>
                        <Button variant="contained" onClick={onAnswersCheck}>Check your answers</Button>
                        <Button variant="contained" onClick={onFinish}>Finish</Button>
                    </div>
                </CardContent>
            </Card>
    )
}