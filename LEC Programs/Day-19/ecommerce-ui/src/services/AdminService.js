import axios from "axios";
import { ADMIN_API_URL } from "../constants/APIConstant";

export function adminLogin(formData){
    return axios.post(`${ADMIN_API_URL}/login`, formData)
}