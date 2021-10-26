import { Card, Typography } from "@material-ui/core"
import { styled } from "@material-ui/system"


export const ModalCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        position: absolute;
        top: 30px;
        right: 30px;
        border: 0;
        background: transparent;
        cursor: pointer;
        transition: .5s ease;
        
        & :hover {
            color: #ff7043;
        }
    }

    section {
        width: 90%;
        text-align: center;

        ul{
            li{
                background: #fafafa;
                margin: 15px;
                padding: 10px;
            }
        }
    }

    ul {
        list-style: none;
    }
`

export const AnswerCard = styled(Typography)`
    background: #64b5f6;
    color: whitesmoke;
    margin: 10px;
    padding: 10px;
    &.success{
        background: #66bb6a;
    }

    &.error {
        background: #ff7043;
    }
`