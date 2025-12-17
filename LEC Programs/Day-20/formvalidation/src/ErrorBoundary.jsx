import { Component } from "react";

export class ErrorBoundary extends Component{

    constructor(){
        super();
        this.state={
            error:null
        }
    }

    componentDidCatch(error){
        this.setState({error:error});
    }

    render(){
        return (
            <div>
                {
                    this.state.error ? <h1>Something went wrong....!</h1> : this.props.children
                }
            </div>
        )
    }

}