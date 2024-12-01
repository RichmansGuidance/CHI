import { ConflictException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(userDto: CreateUserDto): Promise<User> {
        const { username, password } = userDto;

        const existingUser  = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new ConflictException('User with such username already exists');
        }

        const hashPassword = await this.hashPassword(password);
        const user = await this.usersService.create({username, password: hashPassword});

        return user;
    }

    async login(userDto: LoginDto): Promise<{ access_token: string; userId: number; username: string; }> {
        const user = await this.validateUser(userDto);
        const access_token = await this.generateToken(user);
        return {
            access_token,
            userId: user.id,
            username: user.username
        }
    }

    private async generateToken(user: User): Promise<string> {
        const payload = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        };
        const secret = process.env.JWT_SECRET || 'your_secret_key';
        const token = this.jwtService.sign(payload, { secret });
        return token;
    }

    async validateUser(userDto: LoginDto): Promise<User> {
        const { username, password } = userDto;
        if (!username || !password) {
            throw new HttpException("Username and password are required", HttpStatus.BAD_REQUEST)
        }

        const registeredUser = await this.usersService.findByUsername(username);

        if (!registeredUser) {
            throw new UnauthorizedException({message: `No users with such username: '${username}' found`});
        }

        const isPasswordEqual = await this.comparePassword(password, registeredUser.password);
        if (!isPasswordEqual) {
            throw new UnauthorizedException({message: 'Invalid login credentials'});
        }

        return registeredUser;
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    private async comparePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, storedPassword);
    }
}
