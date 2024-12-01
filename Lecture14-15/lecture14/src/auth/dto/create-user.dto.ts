import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({example: 'XS', description: 'Username'})
    @IsString({message: 'Username must be a string'})
    @IsNotEmpty({message: 'Username is required'})
    @MinLength(2, {message: 'Username must be at least 2 symbols long'})
    readonly username: string;

    @ApiProperty({example: '123456', description: 'Password'})
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(6, {message: 'Password must be at least 6 symbols long'})
    readonly password: string;
}