import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../services/TokenService";

export function PrivateRoute(){

    const token = getToken();

    if(token){
        return <Outlet/>
        // send user on the desired component
    }
    else{
        // redirect a user on login page
        return <Navigate to={"/"} />
    }
}