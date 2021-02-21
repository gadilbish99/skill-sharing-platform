import { getToken } from "../Utils/cookie";

export const BASE_URL = 'http://localhost:4000';
export const API_URL = 'http://localhost:4000/api/v1';

export const DEFAULT_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: 'include'
}

export const UPLOAD_CONFIG = {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
    },
    withCredentials: 'include'
}