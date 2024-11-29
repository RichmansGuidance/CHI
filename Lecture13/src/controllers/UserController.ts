import { Get, Post, Patch, Body, JsonController, Param, Delete, HttpError } from "routing-controllers";
import { ValidateArgs } from "../decorators/validator";
import { UserI } from "../interfaces/UserI";
import { UserDTO } from "../dto/UserDTO";
import { AppDataSource } from "../data-source/data-source";
import { User } from "../entities/User";

@JsonController('/users')
export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    @Get('/')
    async getAllUsers() {
        try {
            // Використання вибіркового завантаження 
            return await this.userRepository.find({
                select: ['id', 'user', 'email'], // Вибіркове завантаження полів
                cache: true // Кешування результатів
            });
        } catch (err) {
            throw new HttpError(500, 'Failed to retrieve users');
        }
    }

    @Post('/')
    @ValidateArgs(UserDTO)
    async create(@Body() userDto: Pick<UserI, "user" | "email">) {
        try {
            const newUser = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(userDto)
                .execute();

            return newUser.raw[0];
        } catch (err) {
            if (err instanceof Error && err.message.includes('duplicate')) {
                throw new HttpError(409, 'User already exists');
            }
            throw new HttpError(500, 'Failed to create user');
        }
    }

    @Patch('/:id')
    @ValidateArgs(UserDTO)
    async update(@Param('id') id: number, @Body() userDto: Pick<UserI, "user" | "email">) {
        try {
            const result = await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set(userDto)
                .where('id = :id', { id })
                .execute();

            if (result.affected === 0) {
                throw new HttpError(404, `User with ID ${id} not found`);
            }

            return { id, ...userDto };
        } catch (err) {
            if (err instanceof HttpError) throw err;
            throw new HttpError(500, 'Failed to update user');
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            const result = await this.userRepository
                .createQueryBuilder()
                .delete()
                .where('id = :id', { id })
                .execute();

            if (result.affected === 0) {
                throw new HttpError(404, `User with ID ${id} not found`);
            }

            return { success: true };
        } catch (err) {
            if (err instanceof HttpError) throw err;
            throw new HttpError(500, 'Failed to delete user');
        }
    }

}