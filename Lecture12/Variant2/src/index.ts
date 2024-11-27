import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppController } from './controllers/AppController'; 

const PORT = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [UserController, AppController], 
  defaultErrorHandler: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
