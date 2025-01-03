import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'kas',
    password: '123456',
    database: 'lecture13',
    synchronize: true,
    logging: true,
    entities: ["src/entities/**/*"],
    migrations: ["src/migrations/**/*"],
})