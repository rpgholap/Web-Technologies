import { Component } from "react";

export class HeaderContent extends Component{
    render(){
        return (
            <div>
                <h1>{this.props.heading}</h1>
                <p>{this.props.intro}</p>
                <button>{this.props.buttonText}</button>
                {
                    this.props.link ? <a href={this.props.link}>{this.props.linkText}</a> : null
                }
                {
                    this.props.age >= 18 ? <h3>User is eligible</h3> : <h3>User is not eligible</h3>
                }
            </div>
        )
    }
}