import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controllers/UserController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.json({ author: 'Richman' });
});

app.get('/users', UserController.getAll);
app.get('/users/:id', UserController.getById); 
app.post('/users', UserController.create);
app.patch('/users/:id', UserController.update);
app.delete('/users/:id', UserController.delete);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
