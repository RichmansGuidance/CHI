import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExhibitsModule } from 'src/exhibits/exhibits.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    ExhibitsModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, JwtAuthGuard]
})
export class CommentsModule {

}
