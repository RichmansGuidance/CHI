import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'kas',
    password: '123456',
    database: 'lecture13',
    synchronize: false,
    entities: [User],
    migrations: ["src/migrations/**/*"],
})