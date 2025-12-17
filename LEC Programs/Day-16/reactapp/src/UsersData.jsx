import { Component } from "react";

export class UsersData extends Component{

    constructor(){
        super();
        this.state = {
            users:[]
        }
    }

   async componentDidMount(){
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            this.setState({users:data});
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.users.length === 0 ? 
                    <h3>No users found</h3> :
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              this.state.users.map((user)=>{
                                return (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                              })  
                            }
                        </tbody>
                    </table>
                }
            </div>
        )
    }

}