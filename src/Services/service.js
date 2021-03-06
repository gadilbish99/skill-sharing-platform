import axios from "axios";
import { API_URL, DEFAULT_CONFIG, UPLOAD_CONFIG } from "./config";
import { getToken, setToken, removeToken, isAccessTokenExpired } from "../Utils/cookie";

axios.interceptors.request.use(async (config) => {
    if(isAccessTokenExpired() && config.url !== API_URL + '/auth/refresh_token') {
        try {
            const { accesstoken } = await refreshToken();
            setToken(accesstoken);
        } catch (error) {
            console.log(error);
            removeToken();
            return Promise.reject(error);
        }
    }

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
    console.log(response)
    return response;
}, async (error) => {
    console.log(error.response)
    const originalRequest = error.config;
    // If a refresh token is expired
    if (error.response.status === 401 && originalRequest.url === API_URL + '/auth/refresh_token') {
        removeToken();
        return Promise.reject(error);
    }

    // If status code is 401, 
    // get a new refresh token 
    // and retry the original request 
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { accesstoken } = await refreshToken();
            setToken(accesstoken);
            if (originalRequest.data) 
                originalRequest.data = JSON.parse(originalRequest.data)
            return axios(originalRequest);
        } catch (error) {
            return Promise.reject(error);
        }
    }
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
        return response.data; 
    } catch (error) {
        throw error.response.data;
    }
}

export async function postBlog(formData) {
    try {
        const response = await axios.post(API_URL + '/post', formData, DEFAULT_CONFIG);
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
        throw error.response.data.error;
    }
}

export async function refreshToken() {
    try {
        const response = await axios({
            url: API_URL + '/auth/refresh_token',
            method: 'post',
            headers: DEFAULT_CONFIG.headers,
            withCredentials: 'include'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}