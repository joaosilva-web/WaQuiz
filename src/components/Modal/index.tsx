import { useContext } from "react";
import { QuestionsAnsweredContext } from "../../contexts/questionsAnsweredContext";
import { Dialog, Typography } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';

import * as S from "./styles"


export function Modal({ onClose, results, data}: any) {
    const { answers } = useContext(QuestionsAnsweredContext)

    console.log("results modal:",answers);
    console.log("data modal:",data)

    return(
        <Dialog onClose={onClose} open={onClose} className="modal">
            <S.ModalCard>
                <header className="modal-card-header">
                    <Typography variant="h2">Your answers</Typography>
                    <button className="close" onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </header>
                <section className="modal-card-body">
                    <ul>
                        {answers.map((result:any, i:any) => (
                            <li key={i}>
                                <Typography variant="body1">
                                    <strong>{result.q}</strong>
                                </Typography>
                                <S.AnswerCard variant="body1" className={result.a === data[i].correct_answer ? "success" : "error"}>
                                    Your answer: {result.a}
                                </S.AnswerCard>
                                {result.a !== data[i].correct_answer && <S.AnswerCard variant="body1" >Correct answer: {data[i].correct_answer}</S.AnswerCard>}
                            </li>
                        ))}
                    </ul>
                </section>
            </S.ModalCard>
        </Dialog>
    )
}