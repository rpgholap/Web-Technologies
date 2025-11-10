import { Component } from "react";

export class Scoreboard extends Component{
    
    constructor(){
        super();
        this.state = {
            score : 0
        };
        this.incrementScore =  this.incrementScore.bind(this);
        this.decrementScore =  this.decrementScore.bind(this);
    }

    componentDidMount(){
        console.log("inside did mount");
    }

    incrementScore(){
        console.log(this);
        this.setState({score : this.state.score + 4});
    }

    decrementScore(){
        this.setState({score : this.state.score - 1});
    }


    render(){
        console.log("inside render");
        return (
            <div>
                <h1>{this.state.score}</h1>
                <button onClick={this.incrementScore}>+</button>
                <button onClick={this.decrementScore}>-</button>
            </div>
        )
    }
}