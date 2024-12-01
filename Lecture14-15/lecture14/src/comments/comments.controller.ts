import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { plainToInstance } from 'class-transformer';
import { Comment } from './comments.entity';
import { ParamsCommentDto } from './dto/params-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('exhibits')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post(':exhibitId/comments')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Create a new comment" })
    @ApiResponse({ status: 201, description: "New comment created successfully" })
    async createComment(
        @Param() { exhibitId }: ParamsCommentDto, 
        @Body() commentDto: CreateCommentDto, 
        @Req() req) 
    {
        const comment = await this.commentsService.create(exhibitId, commentDto.text, req.user);
        return plainToInstance(Comment, comment, { excludeExtraneousValues: true });
    }

    @Get(':exhibitId/comments')
    @ApiOperation({ summary: "Get all comments for an exhibit" })
    @ApiResponse({ status: 200, description: "fine" })
    async getAllExhibitComments(@Param() { exhibitId }: ParamsCommentDto) {
        const comments = await this.commentsService.getExhibitComments(exhibitId);
        return plainToInstance(Comment, comments, { excludeExtraneousValues: true });
    }


    @Delete(':exhibitId/comments/:commentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Delete comment of the exhibit" })
    @ApiResponse({ status: 200, description: "fine" })
    @ApiResponse({ status: 400, description: "Comment is not associated with such exhibit" })
    @ApiResponse({ status: 403, description: "You do not have permission to delete this comment" })
    @ApiResponse({ status: 404, description: "Comment has not been found" })
    async deleteComment(@Param() params: ParamsCommentDto, @Req() req) {
        return await this.commentsService.remove(params.exhibitId, params.commentId, req.user);
    }
}
