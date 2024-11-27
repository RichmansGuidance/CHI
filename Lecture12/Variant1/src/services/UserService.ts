import fs from 'fs/promises';

class UserService {
  private static USERS_FILE = './src/users.json';

  static async readUsers(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.USERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  static async writeUsers(users: any[]): Promise<void> {
    try {
      await fs.writeFile(this.USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error writing users file:', error);
    }
  }

  static async findUserById(id: number): Promise<any | null> {
    const users = await this.readUsers();
    return users.find((u: any) => u.id === id) || null;
  }
}

export default UserService;
