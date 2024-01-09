import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../prisma/services/prisma.service';
import { UserController } from './controllers/user.controller';
import { GhibliApiService } from '../ghibli-api/services/ghibli-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, GhibliApiService],
})
export class UserModule {}
