import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";



export function Start({ onQuizStart }:any) {
    const [amountQuestions, setAmountQuestions] = useState("");



    return(
        <Card sx={{minWidth: 400, display: 'flex', justifyContent: 'center', margin: "0 auto"}}>
           <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
           <Typography variant="h1" sx={{fontSize: 24}}>choose how many questions you want to answer</Typography>
           <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => localStorage.setItem("questionsAmount",event.target.value)}
          />
           <Button variant="contained" onClick={onQuizStart}>Start</Button>
           </CardContent>
        </Card>
    )
}