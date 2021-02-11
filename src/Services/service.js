import axios from "axios";
import { API_URL, BASE_URL, DEFAULT_CONFIG, UPLOAD_CONFIG } from "./config";
import { getToken, setToken } from "../Utils/cookie";

axios.interceptors.request.use(async (config) => {
    if (getToken()) {
        config.headers = {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json'
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data
    // console.log(`Yes it's 2xx`);
    // console.log(response.data)
    return response;
}, async (error) => {
// Any status codes that falls outside the range of 2xx cause this function to trigger
// Do something with response error
    // console.log(`No it's 4xx`);
    // console.log(error.response.status);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { accesstoken } = await refreshToken();
            setToken(accesstoken);
            // console.log(error.response)
            // console.log(typeof originalRequest.data);
            if (originalRequest.data) {
                originalRequest.data = JSON.parse(originalRequest.data)
            }
            return axios(originalRequest);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // console.log(error.response);
    return Promise.reject(error);
});

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
        const response = await axios.post(API_URL + '/upload', formData, UPLOAD_CONFIG);
        return BASE_URL + '/' + response.data;
    } catch (error) {
        throw error;
    }
}

export async function postBlog(formData) {
    try {
        // const response = await axios.post(API_URL + '/post', formData, DEFAULT_CONFIG);
        // return response.data;
        const response = await axios({
            url: API_URL + '/post',
            method: 'post',
            headers: DEFAULT_CONFIG.headers,
            withCredentials: 'include',
            data: formData
        });
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

export async function refreshToken() {
    try {
        const response = await axios({
            url: API_URL + '/user/refresh_token',
            method: 'post',
            headers: DEFAULT_CONFIG.headers,
            withCredentials: 'include'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}