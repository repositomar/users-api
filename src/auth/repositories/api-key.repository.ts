import { Injectable } from '@nestjs/common';
import { ApiKeyEntity } from '../entities/api-key.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyRepository {
  constructor(private readonly configService: ConfigService) {}
  private keys: ApiKeyEntity[] = [
    {
      key: this.configService.get<string>('security.apiKey'),
    },
  ];

  public findOne(key: string): ApiKeyEntity {
    return this.keys.find((apiKey) => key === apiKey.key);
  }
}
