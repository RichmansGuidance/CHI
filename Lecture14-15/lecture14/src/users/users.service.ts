import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { GetUsersDTO } from './dto/GetUsersDTO';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async getUser(query: GetUsersDTO) {
        const { id, username } = query;
        const user = id ? 
            await this.findById(id) : 
            await this.findByUsername(username);

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findById(id: number) {
        return await this.userRepository.findOne({ where: {id} });
    }

    async findByUsername(username: string) {
        return await this.userRepository.findOne({ where: {username} });
    }

    async create(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto);
        await this.userRepository.save(user);
        return user;
    }
}
