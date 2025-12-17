import { Component } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export class Demo extends Component{

    render(){ // render means to provide something, render function will provide the ui code
       return (
        <div>
            <h1>This is demo component</h1>
            <LoginForm/>
            <SignUpForm/>
        </div>
       )
    }
}
