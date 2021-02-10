import axios from "axios";
import { API_URL, BASE_URL, DEFAULT_CONFIG, UPLOAD_CONFIG, AUTH_CONFIG } from "./config";

export async function getPosts() {
    try {
        const response = await axios.get(API_URL + '/posts', DEFAULT_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function upload(formData) {
    try {
        const response = await axios.post(API_URL + '/upload', formData, AUTH_CONFIG);
        return BASE_URL + '/' + response.data;
    } catch (error) {
        throw error;
    }
}

export async function postBlog(formData) {
    try {
        const response = await axios.post(API_URL + '/post', formData, AUTH_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getPost(id) {
    try {
        const response = await axios.get(API_URL + '/post/' + id, DEFAULT_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function signUp(formData) {
    try {
        const response = await axios.post(API_URL + '/user/register', formData, DEFAULT_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function login(formData) {
    try {
        const response = await axios.post(API_URL + '/user/login', formData, DEFAULT_CONFIG);
        return response.data;
    } catch (error) {
        throw error;
    }
}