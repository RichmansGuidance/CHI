import { UserI } from "./UserI";
import { UserStatus } from "@/utils/UserStatus";

export interface UserStateI {
    token: string | null;
    isAuthenticated: boolean;
    user: UserI | null;
    status: UserStatus;
}