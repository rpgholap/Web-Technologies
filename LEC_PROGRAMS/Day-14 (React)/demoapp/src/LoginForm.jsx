import { Component } from "react";

export class LoginForm extends Component{
    render(){
        return (
            <form>
                <input type="text" placeholder="Enter username" />
                <br/><br/>
                <input type="password" placeholder="Enter password" />
                <br/><br/>
                <input type="submit" value="login" />
            </form>
        )
    }
}