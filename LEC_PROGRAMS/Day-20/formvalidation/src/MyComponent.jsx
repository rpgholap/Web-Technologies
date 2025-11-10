import { useState } from "react"
import { Container } from "react-bootstrap";

export function MyComponent(){
    const [counter, setCounter] = useState(0);
    const handleClick = ()=>{
        setCounter(counter+1);
    }
    if(counter >= 5){
        throw new Error("Invalid counter value occured");
    }
    return (
        <Container>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </Container>
    )
}