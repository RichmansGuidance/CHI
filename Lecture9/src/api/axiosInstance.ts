import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from '../utils/navigate';
import { API_BASE_URL } from '../utils/API_URL';

const defaultToken = localStorage.getItem('token'); 

const defaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        ...(defaultToken && { 'Authorization': `Bearer ${defaultToken}` })
    },
    timeout: 5000,
};

const uploadConfig: AxiosRequestConfig = {
    ...defaultConfig,
    headers: {
        ...defaultConfig.headers,
        'Content-Type': 'multipart/form-data',
    }
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);
export const axiosUploadInstance: AxiosInstance = axios.create(uploadConfig);

const addInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('token');
                history.push('/login');
            }
            return Promise.reject(error);
        }
    );
};

addInterceptors(axiosInstance);
addInterceptors(axiosUploadInstance);

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    axiosUploadInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers['Authorization'];
    delete axiosUploadInstance.defaults.headers['Authorization'];
    localStorage.removeItem('token');
};
