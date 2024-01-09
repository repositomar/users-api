import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApiKeyService } from '../services/api-key.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly apiKeyService: ApiKeyService) {
    super(
      {
        header: 'Authorization',
        prefix: '',
      },
      false,
    );
  }

  public validate(apiKey: string) {
    const key = this.apiKeyService.findKey(apiKey);
    if (!key) {
      throw new UnauthorizedException();
    }
    return key;
  }
}
