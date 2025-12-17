import axios from 'axios';
import { PRODUCT_API_URL } from '../constants/APIConstant';

export async function saveProduct(formData){
    return axios.post(PRODUCT_API_URL, formData);
}

export function getAllProducts(){
    return axios.get(PRODUCT_API_URL);
}

export function deleteProduct(id){
    return axios.delete(`${PRODUCT_API_URL}/${id}`);
}

export function getProductById(id){
    return axios.get(`${PRODUCT_API_URL}/${id}`);
}

export function updateProduct(id, formData){
    return axios.put(`${PRODUCT_API_URL}/${id}`, formData);
}
// 100 functions