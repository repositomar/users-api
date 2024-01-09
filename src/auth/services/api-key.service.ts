import { Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyEntity } from '../entities/api-key.entity';

@Injectable()
export class ApiKeyService {
  constructor(private apiKeyRepository: ApiKeyRepository) {}

  public findKey(key: string): ApiKeyEntity {
    return this.apiKeyRepository.findOne(key);
  }
}
