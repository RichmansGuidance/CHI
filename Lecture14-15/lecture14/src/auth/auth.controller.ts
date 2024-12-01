import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/users.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully', type: User })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('/register')
    async register(@Body() userDto: CreateUserDto) {
        const user = await this.authService.register(userDto);
        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: 200,
        description: 'User logged',
        schema: {
            example: { access_token: 'jwt_token', userId: 1, username: 'XS' }
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid login credentials' })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() userDto: LoginDto, @Res() res) {
        const response = await this.authService.login(userDto);

        return res.status(HttpStatus.OK).json(response);
    }
}
