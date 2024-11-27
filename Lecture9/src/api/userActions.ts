import { axiosInstance } from "./axiosInstance";
import { LoginI } from "../Interfaces/LoginI";

export const UserActions = {
    async register(data : LoginI) {
        const url = '/users/register';
        return await axiosInstance.post(url, data);
    },
    async login(data : LoginI) {
        const url = '/api/auth/login';
        return await axiosInstance.post(url, data);
    },
    async getMe() {
        const url = '/users/my-profile';
        return await axiosInstance.get(url);
    }
}