import { Module } from '@nestjs/common';
import { ExhibitsController } from './exhibits.controller';
import { ExhibitsService } from './exhibits.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Exhibit } from './exhibits.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FileService } from 'src/file/file.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exhibit]),
    UsersModule,
  ],
  controllers: [ExhibitsController],
  providers: [ExhibitsService, JwtAuthGuard, FileService, NotificationsGateway],
  exports: [ExhibitsService]
})
export class ExhibitsModule {}
