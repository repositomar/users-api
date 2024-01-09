import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  GeneralResponse,
  GeneralResponsePaginated,
} from '../../helpers/dto/general_response.dto';
import { User, UserGhibli } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller()
@UseGuards(ApiKeyGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiResponse({
    status: 201,
    description: 'Create a user',
  })
  @ApiBody({ type: CreateUserDTO, required: true })
  createUser(@Body() body: CreateUserDTO): Promise<GeneralResponse<User>> {
    return this.userService.createUser(body);
  }

  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    isArray: true,
  })
  @ApiQuery({
    name: 'page',
    description: 'Index of the page desired',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Size of the page desired',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'Order records',
    required: false,
  })
  getUsers(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('order') order?: string,
  ): Promise<GeneralResponsePaginated<User[]>> {
    return this.userService.getUsers(page, limit, order);
  }

  @Get(':userId')
  @ApiResponse({
    status: 200,
    description: 'Get user',
  })
  @ApiParam({ name: 'userId', description: 'UserId', required: true })
  getUser(
    @Param('userId') userId: string,
  ): Promise<GeneralResponse<UserGhibli>> {
    return this.userService.getUser(userId);
  }

  @Put(':userId')
  @ApiResponse({
    status: 200,
    description: 'Update user',
  })
  @ApiParam({ name: 'userId', description: 'UserId', required: true })
  updateUser(
    @Param('userId') userId: string,
    @Body() body: CreateUserDTO,
  ): Promise<GeneralResponse<User>> {
    return this.userService.updateUser(userId, body);
  }

  @Delete(':userId')
  @ApiResponse({
    status: 200,
    description: 'Delete user',
  })
  @ApiParam({ name: 'userId', description: 'UserId', required: true })
  deleteUser(@Param('userId') userId: string): Promise<GeneralResponse<User>> {
    return this.userService.deleteUser(userId);
  }
}
