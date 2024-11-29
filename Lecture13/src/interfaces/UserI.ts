import { IsEmail, IsString } from "../decorators/validator";

export class UserI {
    id!: number;

    @IsString()
    user!: string;

    @IsEmail()
    email!: string;
}