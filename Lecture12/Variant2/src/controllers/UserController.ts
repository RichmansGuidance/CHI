import {
  JsonController,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  NotFoundError,
} from 'routing-controllers';
import { UserDTO } from '../dto/UserDTO';
import UserService from '../services/UserService';
import { UpdateUserDTO } from '../dto/UpdateUserDTO'; 

@JsonController('/users')
export class UserController {
  private async getUsers() {
    return await UserService.readUsers();
  }

  private async saveUsers(users: any[]) {
    await UserService.writeUsers(users);
  }

  @Get('/')
  async getAll() {
    return this.getUsers();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const users = await this.getUsers();
    const user = users.find(u => u.id === id);
    if (!user) throw new NotFoundError('User  not found');
    return user;
  }

  @Post('/')
  async create(@Body() userData: UserDTO) {
    const users = await this.getUsers();
    const newUser  = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...userData,
    };
    users.push(newUser );
    await this.saveUsers(users);
    return { message: 'User  created', newUser  };
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() userData: UpdateUserDTO) {
    const users = await this.getUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundError('User  not found');

    const updatedUser  = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser ;
    await this.saveUsers(users);

    return { message: 'User  updated', updatedUser  };
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const users = await this.getUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundError('User  not found');

    users.splice(userIndex, 1);
    await this.saveUsers(users);

    return { message: 'User  deleted' };
  }
}