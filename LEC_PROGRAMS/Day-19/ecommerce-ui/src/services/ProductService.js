import axios from 'axios';
import { PRODUCT_API_URL } from '../constants/APIConstant';
import { getToken } from './TokenService';

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function saveProduct(formData) {
    return axios.post(PRODUCT_API_URL, formData, getAuthHeader());
}

export function getAllProducts() {
    return axios.get(PRODUCT_API_URL, getAuthHeader());
}

export function deleteProduct(id) {
    return axios.delete(`${PRODUCT_API_URL}/${id}`, getAuthHeader());
}

export function getProductById(id) {
    return axios.get(`${PRODUCT_API_URL}/${id}`, getAuthHeader());
}

export function updateProduct(id, formData) {
    return axios.put(`${PRODUCT_API_URL}/${id}`, formData, getAuthHeader());
}
// 100 functions