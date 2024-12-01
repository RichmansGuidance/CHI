import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from '../exhibits/exhibits.entity';
import { Comment } from '../comments/comments.entity';

@Entity('users')
export class User {
    @Expose()
    @ApiProperty({ example: '1', description: 'Unique ID for user' })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ApiProperty({ example: 'August', description: 'Unique username of user', maxLength: 20 })
    @Column({ unique: true, type: 'varchar', nullable: false, length: 20 })
    username: string;

    @ApiProperty({ example: '123456', description: 'password of user', writeOnly: true })
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @ApiProperty({ type: () => [Exhibit], description: 'List of exhibits posted by user' })
    @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
    exhibits: Exhibit[];

    @ApiProperty({ type: () => [Comment], description: 'List of comments posted] by user' })
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}