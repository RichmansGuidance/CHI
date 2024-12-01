import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class GetUsersDTO {
    @ApiProperty({ example: 1, description: 'unique ID for user' })
    @Type(() => Number)
    @IsInt({ message: 'ID must be an integer' })
    id?: number;

    @ApiProperty({ example: 'August', description: 'username of the user' })
    @IsString({ message: 'Username must be a valid string' })
    username?: string;
}