import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class ParamsCommentDto {
    @ApiProperty({ description: 'Exhibit ID', example: 10, required: true })
    @Type(() => Number)
    @IsInt({ message: 'Exhibit ID must be an integer' })
    exhibitId: number

    @ApiProperty({ description: 'Comment ID', example: 1, required: false })
    @Type(() => Number)
    @IsInt({ message: 'Comment ID must be an integer' })
    @IsOptional()
    commentId?: number
}