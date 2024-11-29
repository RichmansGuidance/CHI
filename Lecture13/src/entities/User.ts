import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user!: string;

    @Column({unique: true})
    email!: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date
}