import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UserGhibli } from 'src/users/dtos/user.dto';

@Injectable()
export class GhibliApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private baseUrl = this.configService.get<string>('ghibliApi.url');

  async getGhibliData(role: string): Promise<UserGhibli> {
    const apiUrl = `${this.baseUrl}/${role}`;
    const { data } = await firstValueFrom(
      this.httpService.get(apiUrl).pipe(
        catchError((error: AxiosError) => {
          Logger.log(error.response.data);
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
    return data;
  }
}
