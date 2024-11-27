import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.readUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
  
      const user = await UserService.findUserById(userId);
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  }
  
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { user, email } = req.body;
      const users = await UserService.readUsers();
      
      const newUser = {
        id: users.length + 1,
        user,
        email,
      };

      users.push(newUser);
      await UserService.writeUsers(users);
      
      res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { user, email } = req.body;
      
      const userId = parseInt(id);
      const existingUser = await UserService.findUserById(userId);
      
      if (!existingUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const updatedUser = {
        ...existingUser,
        ...(user && { user }),
        ...(email && { email })
      };

      const users = await UserService.readUsers();
      const userIndex = users.findIndex((u: any) => u.id === userId);
      users[userIndex] = updatedUser;
      
      await UserService.writeUsers(users);
      res.json({ message: 'User updated', updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
      
      const users = await UserService.readUsers();
      const userIndex = users.findIndex((u: any) => u.id === userId);

      if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      users.splice(userIndex, 1);
      await UserService.writeUsers(users);
      
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
}

export default UserController;
