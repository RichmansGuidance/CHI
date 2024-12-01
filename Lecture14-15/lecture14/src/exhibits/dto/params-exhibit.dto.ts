import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class ParamsExhibitDto {
    @ApiProperty({ description: 'Exhibit ID', example: 10, required: true })
    @Type(() => Number)
    @IsInt({ message: 'Exhibit ID must be an integer' })
    id: number
}