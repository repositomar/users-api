import { Module } from '@nestjs/common';
import {
  PrismaService,
  PrismaServiceProviderName,
} from './services/prisma.service';

@Module({
  providers: [
    {
      provide: PrismaServiceProviderName,
      useClass: PrismaService,
    },
  ],
  exports: [
    {
      provide: PrismaServiceProviderName,
      useClass: PrismaService,
    },
  ],
})
export class PrismaModule {}
