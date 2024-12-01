import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ description: 'Text of comment', type: 'string', example: 'F' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(300, { message: "Comment cannot contain more than 300 symbols" })
    text: string;
}