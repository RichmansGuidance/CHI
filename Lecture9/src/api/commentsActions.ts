import { axiosInstance } from "./axiosInstance";
import { CommentI } from "../Interfaces/CommentI";

export const CommentsActions = {
    async comments(exhibitID : number): Promise<CommentI[] | any> {
        const url = `/api/exhibits/${exhibitID}/comments`;
        return await axiosInstance.get(url);
    },
    async createComment(exhibitID : number, text: string) {
        const url = `/api/exhibits/${exhibitID}/comments`;
        return await axiosInstance.post(url, {text});
    },
    async deleteComment(commentID: number) {
        const url = `/api/exhibits/exhibitID/comments/${commentID}`;
        return await axiosInstance.delete(url);
    }
}