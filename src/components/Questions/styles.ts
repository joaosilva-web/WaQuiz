import { styled } from "@material-ui/system"

export const LabelChoice = styled('label')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    p {
        font-size: 18px;
        font-weight: lighter;
        padding: 12px;
        background: whitesmoke;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.25s ease;
    }
    input[type="radio"] {
        display: none;
    }

    input[type="radio"]:checked + p{
            background: #66bb6a;
            color: white;
        }
`