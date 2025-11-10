import { Component } from "react";

export class UsersData extends Component{

    constructor(){
        super();
        this.state={
            users : []
        }
    }

    async componentDidMount(){
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            this.setState({users: data});
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <div>
                {this.state.users.length === 0 ? <h3>No user found</h3> : <h3>Users found</h3>}
            </div>
        )
    }
}