import { useDispatch, useSelector } from "react-redux"
import { getDecrementAction, getIncrementAction } from "./actions/ScoreActions";

export function ScoreCard() {

    const dispatch = useDispatch();

    const score = useSelector((state) => {
        return state.scoreReducer.score;
    });

    const handleIncrement = ()=>{
        dispatch(getIncrementAction());
    }

    const handleDecrement = ()=>{
        dispatch(getDecrementAction());
    }

    return (
        <div>
            <h1>{score}</h1>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}