import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../utils/API_URL';

const defaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
};

const uploadConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 3000,
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);
export const axiosUploadInstance: AxiosInstance = axios.create(uploadConfig);

const addInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
};

addInterceptors(axiosInstance);
addInterceptors(axiosUploadInstance);

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    console.log(axiosInstance.defaults.headers);
    axiosUploadInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers['Authorization'];
    delete axiosUploadInstance.defaults.headers['Authorization'];
};
