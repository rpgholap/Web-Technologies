import { useSelector } from "react-redux"

export function Home(){

    const score = useSelector((state)=>{
        return state.scoreReducer.score;
    });


    return (
        <div>
            <h1>This is home screen, and current value of score is {score} </h1>
        </div>
    )
}