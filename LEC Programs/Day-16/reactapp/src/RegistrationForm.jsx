import { useState } from "react"

export function RegistrationForm(){

    const [formData, setFormData] = useState({name:"", password:"",phone:"", email:""});

    const handleChange = (event) =>{
        setFormData({ ...formData, [event.target.name]:event.target.value});
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(formData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter name" name="name" onChange={handleChange} />
                <br/><br/>
                <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} />
                <br/><br/>
                <input type="text" placeholder="Enter Phone" name="phone" onChange={handleChange} />
                <br/><br/>
                <input type="email" placeholder="Enter Email" name="email" onChange={handleChange} />
                <br/><br/>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}