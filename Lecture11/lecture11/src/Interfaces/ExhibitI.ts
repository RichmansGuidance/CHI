import { UserI } from "./UserI"

export interface ExhibitI {
    id: number
    imageUrl: string
    description: string
    user: UserI
    commentCount: number
    createdAt: string
}