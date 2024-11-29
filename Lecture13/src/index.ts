import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppDataSource } from './data-source/data-source';

const PORT = 3000;
const app = createExpressServer({
  controllers: [UserController],
});

const initializeDatabase = async () => {
  await AppDataSource.initialize();
}

initializeDatabase();

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});