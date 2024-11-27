import { axiosInstance, axiosUploadInstance } from "./axiosInstance";
import { ExhibitI } from "../Interfaces/ExhibitI";

const exhibits_BASE_URL = '/api/exhibits';

export const ExhibitsActions = {
    async exhibits(page: number, limit?: number): Promise<ExhibitI[] | any> {
        const url = exhibits_BASE_URL;
        const response = await axiosInstance.get(url, {
            params: { page, limit }
        });
        return response.data; 
    },
    async myExhibits(page: number, limit?: number): Promise<ExhibitI[] | any> {
        const url = `${exhibits_BASE_URL}/my-posts`;
        const response = await axiosInstance.get(url, {
            params: { page, limit }
        });
        return response.data;
    },
    async createExhibit(exhibitData: FormData): Promise<ExhibitI | any> {
        const url = exhibits_BASE_URL;
        return await axiosUploadInstance.post(url, exhibitData);
    },
    async deleteExhibit(id: number) {
        const url = `${exhibits_BASE_URL}/${id}`;
        return await axiosInstance.delete(url);
    }
}