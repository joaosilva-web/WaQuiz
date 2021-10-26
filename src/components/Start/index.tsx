import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";
import { theme } from "../../theme";

export function Start({ onQuizStart }: any) {
  localStorage.setItem("questionsAmount", "1");
  const questions: any = localStorage.getItem("questions");
  let questionsStorage =
    localStorage.getItem("questions") !== null ? JSON.parse(questions) : [];
  console.log("questionStorage", questionsStorage);

  const result: any = localStorage.getItem("result");
  let resultStorage =
    localStorage.getItem("result") !== null ? JSON.parse(result) : [];
  console.log("resultStorage", resultStorage);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (questionsStorage.length > 0) {
      setOpen(true);
    } else {
      alert("You didn't even answer a quiz");
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            minWidth: 400,
            height: 400,
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <div>
              <Typography
                variant="h1"
                sx={{ fontSize: 24, fontWeight: "bold" }}
              >
                Choose how many questions you want to answer
              </Typography>
              <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: "100%", marginTop: "8px" }}
                onChange={(event) =>
                  localStorage.setItem("questionsAmount", event.target.value)
                }
              />
            </div>
            <Button
              variant="contained"
              sx={{ color: "white", height: 50 }}
              onClick={onQuizStart}
            >
              Start
            </Button>
          </CardContent>
        </Card>

        <Button onClick={handleOpen}>Last Report</Button>

        <Dialog onClose={handleClose} open={open} className="modal">
          <S.ModalCard>
            <header className="modal-card-header">
              <Typography variant="h2">Your Last Report</Typography>
              <button className="close" onClick={handleClose}>
                <CloseIcon />
              </button>
            </header>
            <section className="modal-card-body">
              <ul>
                {resultStorage.map((result: any, i: any) => (
                  <li key={i}>
                    <Typography variant="body1">
                      <strong
                        dangerouslySetInnerHTML={{ __html: result.q }}
                      ></strong>
                    </Typography>
                    <S.AnswerCard
                      variant="body1"
                      className={
                        result.a === questionsStorage[i].correct_answer
                          ? "success"
                          : "error"
                      }
                      dangerouslySetInnerHTML={{ __html: result.a }}
                    ></S.AnswerCard>
                    {result.a !== questionsStorage[i].correct_answer && (
                      <S.AnswerCard
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: questionsStorage[i].correct_answer,
                        }}
                      ></S.AnswerCard>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </S.ModalCard>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
