import { IsEmail, IsString } from "../decorators/validator";

export class UserDTO {
    @IsString()
    user!: string;

    @IsEmail()
    email!: string;
}