import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { User } from './users.entity';
import { GetUsersDTO } from './dto/GetUsersDTO';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    @ApiOperation({ summary: "Get user by ID or username" })
    @ApiQuery({ name: 'id', type: Number, required: false, description: 'The unique ID of user' })
    @ApiQuery({ name: 'username', type: String, required: false, description: 'The username of user' })
    @ApiResponse({ status: 200, type: [User] })
    @ApiResponse({ status: 400, description: 'Invalid parameters' })
    async getUserByQuery(@Query() query: GetUsersDTO) {
        const user = await this.usersService.getUser(query);
        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }

    @Get('my-profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Get user info" })
    @ApiResponse({ status: 200, type: [User], description: 'User info received successfuly' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMe(@Req() req) {
        return plainToInstance(User, req.user, { excludeExtraneousValues: true })
    }
}
