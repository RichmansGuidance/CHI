import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExhibitsService } from './exhibits.service';
import { QueryExhibitDto } from './dto/query-exhibit.dto';
import { plainToInstance } from 'class-transformer';
import { Exhibit } from './exhibits.entity';
import { Response } from 'express';
import { ParamsExhibitDto } from './dto/params-exhibit.dto';

@Controller('exhibits')
export class ExhibitsController {
    constructor(private readonly exhibitsService: ExhibitsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Post exhibit" })
    @ApiResponse({ status: 201, description: "New exhibit has been posted successfully" })
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                description: { type: 'string' }
            }
        }
    })
    async createExhibit(
        @UploadedFile() file: Express.Multer.File,
        @Body() exhibitDto: CreateExhibitDto,
        @Req() req
    ) {
        return await this.exhibitsService.create(file, exhibitDto.description, req.user); 
    }

    @Get()
    @ApiOperation({ summary: "Get all exhibits" })
    @ApiResponse({ status: 200, description: "The list of exhibits" })
    async getAllExhibits(@Query() query: QueryExhibitDto) {
        const {page = 1, limit = 10} = query;
        const exhibits =  await this.exhibitsService.getAll(page, limit);
        return {
            ...exhibits,
            data: plainToInstance(Exhibit, exhibits.data, { excludeExtraneousValues: true })
        }
    }

    @Get('my-posts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Get user's exhibits" })
    @ApiResponse({ status: 200, description: "The list of my exhibits" })
    async getMyExhibits(@Query() query: QueryExhibitDto, @Req() req) {
        const {page = 1, limit = 10} = query;
        const exhibits =  await this.exhibitsService.getMy(req.user.id, page, limit);
        return {
            ...exhibits,
            data: plainToInstance(Exhibit, exhibits.data, { excludeExtraneousValues: true })
        }
    }

    @Get('/post/:id')
    @ApiOperation({ summary: "Get exhibit by ID" })
    @ApiResponse({ status: 200, description: "Recieved exhibit by ID" })
    @ApiResponse({ status: 404, description: "Exhibit not found" })
    async getOneExhibit(@Param() { id }: ParamsExhibitDto) {
        const exhibit = await this.exhibitsService.getOne(id);
        return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Delete exhibit by ID" })
    @ApiResponse({ status: 200, description: "Exhibit has been deleted" })
    @ApiResponse({ status: 404, description: "Exhibit has not been found" })
    async deleteExhibit(@Param() { id }: ParamsExhibitDto, @Req() req, @Res() res: Response) {
        await this.exhibitsService.remove(id, req.user);
        res.status(200).send({ success: true });
    }
}
