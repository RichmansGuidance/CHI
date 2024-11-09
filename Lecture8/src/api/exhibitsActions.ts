import { axiosInstance, axiosUploadInstance } from "./axiosInstance";
import { ExhibitI } from "../Interfaces/ExhibitI";

const exhibits_BASE_URL = '/api/exhibits';

export const ExhibitActions = {
    async exhibits(page: number, limit?: number): Promise<ExhibitI[] | any> {
        const url = exhibits_BASE_URL;
        return await axiosInstance.get(url, {
            params: { page, limit }
        });
    },
    async myExhibits(page: number, limit?: number): Promise<ExhibitI[] | any> {
        const url = `${exhibits_BASE_URL}/my-posts`;
        return await axiosInstance.get(url, {
            params: { page }
        });
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