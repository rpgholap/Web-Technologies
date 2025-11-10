import { useState } from "react"

export function Scorecard(){

    const [score, setScore] = useState(0);
   
    const increment = () => {
        setScore(score + 4);
    }

    const decrement = () => {
        setScore(score - 1);
    }

    return (
        <div>
            <h1>{score}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}