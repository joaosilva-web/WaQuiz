import { useContext } from "react";
import { QuestionsAnsweredContext } from "../../contexts/questionsAnsweredContext";
import { Dialog, DialogProps, Typography } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";

interface ModalProps {
  onClose: any;
  data: any;
}

export function Modal({ onClose, data }: ModalProps) {
  const { answers } = useContext(QuestionsAnsweredContext);

  let open = false;

  if (onClose) {
    open = true;
  }

  return (
    <Dialog onClose={onClose} open={open} className="modal" sx={{overflowY: "scroll"}}>
      <S.ModalCard>
        <header className="modal-card-header">
          <Typography variant="h2">Your answers</Typography>
          <button className="close" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
        <section className="modal-card-body">
          <ul>
            {answers.map((result: any, i: any) => (
              <li key={i}>
                <Typography variant="body1">
                  <strong
                    dangerouslySetInnerHTML={{ __html: result.q }}
                  />
                </Typography>
                <S.AnswerCard
                  variant="body1"
                  className={
                    result.a === data[i].correct_answer ? "success" : "error"
                  }
                  dangerouslySetInnerHTML={{ __html: result.a }}
                />
                {result.a !== data[i].correct_answer && (
                  <S.AnswerCard
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: data[i].correct_answer }}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      </S.ModalCard>
    </Dialog>
  );
}
