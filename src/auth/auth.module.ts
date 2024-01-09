import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
  imports: [ConfigModule],
  providers: [ApiKeyService, ApiKeyRepository, ApiKeyGuard, ApiKeyStrategy],
})
export class AuthModule {}
