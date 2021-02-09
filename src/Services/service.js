import axios from "axios";
import { BASE_URL, DEFAULT_CONFIG, UPLOAD_CONFIG } from "./config";


export async function getPosts() {
    try {
        const response = await axios.get(BASE_URL, DEFAULT_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function upload(formData) {
    try {
        const response = await axios.post(BASE_URL + '/upload', formData, UPLOAD_CONFIG);
        return BASE_URL + '/' + response.data;
    } catch (error) {
        throw error;
    }
}