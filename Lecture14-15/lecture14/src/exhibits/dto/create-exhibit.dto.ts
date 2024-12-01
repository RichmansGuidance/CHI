import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateExhibitDto {
    @ApiProperty({ description: 'image file for the exhibit', type: 'string', format: 'binary' })
    readonly image: Express.Multer.File;

    @ApiProperty({ description: 'Description of the exhibit', example: 'The Art of nature' })
    @IsString()
    @IsNotEmpty({ message: 'Description cannot be empty' })
    @MaxLength(100, { message: "Description must be shorter than 100 symbols" })
    readonly description: string;
}