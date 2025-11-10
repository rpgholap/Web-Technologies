import { useEffect, useState } from "react"
import { getUsers } from "./services/UserService";

export function UsersTable() {

    const [users, setUsers] = useState([]);

    const fetchUsersData = async () =>{
        
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        fetchUsersData();

        return ()=>{
            // implements the functionality of componentWillUnmount
        }
    },[]);


    return (
        <div>
            {
                users.length === 0 ? <h3>No user found</h3> :
                    <table>
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
                                users.map((user) => {
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