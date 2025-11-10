import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstant";

export function login(formData){
    return axios.post(`${API_BASE_URL}/login`, formData)
}