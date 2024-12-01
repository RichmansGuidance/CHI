import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'John', description: 'Username'})
    @IsString({message: 'Username must be a string'})
    @IsNotEmpty({message: 'Field can\'t be empty'})
    @MinLength(4, {message: 'Username must be at least 4 characters long'})
    readonly username: string;

    @ApiProperty({example: 'qwerty_password', description: 'Password'})
    @IsNotEmpty({message: 'Field can\'t be empty'})
    @MinLength(4, {message: 'Password must be at least 4 characters long'})
    readonly password: string;
}