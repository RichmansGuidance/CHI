import { UserI } from "./UserI"

export interface CommentI {
    id: number
    text: string
    createdAt: string
    user: UserI
}