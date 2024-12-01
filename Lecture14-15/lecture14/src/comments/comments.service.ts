import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { ExhibitsService } from 'src/exhibits/exhibits.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        private readonly exhibitsService: ExhibitsService
    ) {}

    async create(exhibitId: number, text: string, user: User) {
        await this.exhibitsService.incrementCommentsCount(exhibitId);

        const comment = this.commentsRepository.create({
            exhibit: { id: exhibitId }, 
            text,
            user
        });

        return await this.commentsRepository.save(comment);
    }

    async getExhibitComments(exhibitId: number) {
        return await this.commentsRepository.find({
            where: { exhibit: { id: exhibitId } },
            relations: ['exhibit', 'user'],
        });
    }

    async remove(exhibitId: number, commentId: number, user: User) {
        const comment = await this.findCommentWithExhibit(commentId, exhibitId);
        this.checkPermissions(comment, user);

        await this.commentsRepository.remove(comment);
        await this.exhibitsService.decrementCommentsCount(exhibitId);
        return { message: "Comment deleted successfully", id: commentId };
    }

    private async findCommentWithExhibit(commentId: number, exhibitId: number) {
        const comment = await this.commentsRepository.findOne({
            where: { id: commentId },
            relations: ['exhibit']
        });

        if (!comment) {
            throw new HttpException(`Comment with ID ${commentId} not found`, HttpStatus.NOT_FOUND);
        }
        if (comment.exhibit.id !== exhibitId) {
            throw new HttpException(`This comment ${commentId} is not associated with such ${exhibitId}`, HttpStatus.BAD_REQUEST);
        }

        return comment;
    }

    private checkPermissions(comment: Comment, user: User) {
        if (user.id !== comment.user.id) {
            throw new HttpException('You do not have permission to delete this comment', HttpStatus.FORBIDDEN);
        }
    }
}