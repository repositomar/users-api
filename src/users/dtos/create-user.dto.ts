import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
  @ApiProperty({ type: String })
  @IsString()
  email: string;
  @ApiProperty({ type: String })
  @IsString()
  role: string;
}
