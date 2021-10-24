import { Button, Card, CardContent, Typography } from "@material-ui/core";



export function Start({ onQuizStart }:any) {
    return(
        <Card sx={{minWidth: 400, display: 'flex', justifyContent: 'center', margin: "0 auto"}}>
           <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
           <Typography variant="h1" sx={{fontSize: 24}}>Start Quiz</Typography>
           <Typography variant="body1">Good luck!</Typography>
           <Button variant="contained" onClick={onQuizStart}>Start</Button>
           </CardContent>
        </Card>
    )
}