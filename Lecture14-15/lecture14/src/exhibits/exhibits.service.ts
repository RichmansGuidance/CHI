import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibit } from './exhibits.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import * as path from 'path';
import { FileService } from 'src/file/file.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ExhibitsService {
    constructor(
        @InjectRepository(Exhibit)
        private readonly exhibitsRepository: Repository<Exhibit>,
        private readonly fileService: FileService,
        private readonly notificationService: NotificationsGateway
    ) {}

    async create(file: Express.Multer.File, description: string, user: User): Promise<Exhibit> {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        this.fileService.validateFile(file);
        const imageUrl = await this.uploadFile(file);
        
        const exhibit = this.exhibitsRepository.create({
            imageUrl,
            description,
            userId: user.id
        });

        await this.exhibitsRepository.save(exhibit);
        this.sendNewPostNotification(description, user.username);

        return exhibit;
    }

    async getAll(page: number, limit: number): Promise<{ data: Exhibit[]; total: number; page: number; lastPage: number }> {
        return this.getExhibits({ skip: (page - 1) * limit, take: limit });
    }

    async getMy(userId: number, page: number, limit: number): Promise<{ data: Exhibit[]; total: number; page: number; lastPage: number }> {
        return this.getExhibits({ skip: (page - 1) * limit, take: limit, where: { userId } });
    }
    
    async getOne(id: number): Promise<Exhibit> {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id } });
        if (!exhibit) {
            throw new HttpException(`Exhibit with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return exhibit;
    }

    async remove(id: number, user: User): Promise<void> {
        const exhibit = await this.getOne(id);

        if (user?.isAdmin || exhibit.userId === user.id) {
            await this.exhibitsRepository.remove(exhibit);
            this.fileService.removeFile(exhibit.imageUrl);
        } else {
            throw new HttpException("You do not have permission to delete this exhibit", HttpStatus.FORBIDDEN);
        }
    }

    async incrementCommentsCount(id: number) {
        return this.updateCommentsCount(id, 1);
    }

    async decrementCommentsCount(id: number) {
        return this.updateCommentsCount(id, -1);
    }

    private async updateCommentsCount(id: number, increment: number) {
        const exhibit = await this.getOne(id);
        exhibit.commentCount += increment;
        return this.exhibitsRepository.save(exhibit);
    }

    private async uploadFile(file: Express.Multer.File): Promise<string> {
        const uploadPath = path.join(__dirname, '../../', 'uploads');
        const uniqueFileName = this.fileService.saveFile(file, uploadPath);
        return `/static/${uniqueFileName}`;
    }

    private async getExhibits(options: any): Promise<{ data: Exhibit[]; total: number; page: number; lastPage: number }> {
        const [exhibits, total] = await this.exhibitsRepository.findAndCount(options);
        return this.paginate(exhibits, total, options.skip / options.take + 1, options.take);
    }

    private paginate(data: Exhibit[], total: number, page: number, limit: number) {
        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
    }

    private sendNewPostNotification(message: string, user: string) {
        this.notificationService.handleNewPost({ message, user });
    }
}