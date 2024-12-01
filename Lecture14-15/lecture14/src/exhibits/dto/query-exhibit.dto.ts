import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class QueryExhibitDto {
    @ApiProperty({ description: 'Page number for pagination', example: 1, required: false, minimum: 1 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Page number' })
    page?: number;

    @ApiProperty({ description: 'Limit of items per page', example: 10, required: false, minimum: 1, maximum: 20 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Limit must be greater than or equal to 1' })
    @Max(20, { message: 'Limit must be less than 20' })
    limit?: number;
}