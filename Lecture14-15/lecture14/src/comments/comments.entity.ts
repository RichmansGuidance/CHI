import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Exhibit } from '../exhibits/exhibits.entity';

@Entity('comments')
export class Comment {
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique ID for comment' })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ApiProperty({ example: 'F', description: 'comment' })
    @Column({ type: 'varchar', nullable: false })
    text: string;

    @ApiProperty({ type: () => Exhibit, description: '' })
    @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibitId' })
    exhibit: Exhibit

    @Expose()
    @ApiProperty({ type: () => User, description: 'User who has posted a comment' })
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE', eager: true })
    user: User

    @Expose()
    @ApiProperty({ example: '2023-11-26T13:23:45Z', description: ' timestamp of the comment', })
    @CreateDateColumn()
    createdAt: string;
}