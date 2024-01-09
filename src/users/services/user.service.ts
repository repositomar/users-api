import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  GeneralResponse,
  GeneralResponsePaginated,
} from '../../helpers/dto/general_response.dto';
import { User, UserGhibli } from '../dtos/user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { GhibliApiService } from '../../ghibli-api/services/ghibli-api.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private ghibliApiService: GhibliApiService,
  ) {}

  async createUser(
    createUserData: CreateUserDTO,
  ): Promise<GeneralResponse<User>> {
    try {
      const { email, name, role } = createUserData;
      const user = await this.prismaService.user.create({
        data: { email, name, role },
      });

      return {
        code: 201,
        messsage: 'success',
        data: user,
      };
    } catch (error) {
      Logger.error('Error:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsers(
    page: number,
    limit: number,
    order: string,
  ): Promise<GeneralResponsePaginated<User[]>> {
    try {
      let ordering: any;
      if (order === '1') ordering = Prisma.SortOrder.asc;
      if (order === '-1') ordering = Prisma.SortOrder.desc;

      const users = await this.prismaService.user.findMany({
        take: limit,
        skip: page * limit,
        orderBy: { name: ordering },
      });

      const totalRecords = await this.prismaService.user.count();

      return {
        code: 200,
        messsage: 'success',
        page,
        totalData: totalRecords,
        data: users,
      };
    } catch (error) {
      Logger.error('Error:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUser(userId: string): Promise<GeneralResponse<UserGhibli>> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return {
          code: 404,
          messsage: 'User not found',
          data: null,
        };
      }

      let ghibliData = null;
      const roles = ['films', 'people', 'locations', 'species', 'vehicles'];

      if (roles.includes(user.role)) {
        ghibliData = await this.ghibliApiService.getGhibliData(user.role);
      }

      return {
        code: 200,
        messsage: 'success',
        data: { ...user, ghibliData },
      };
    } catch (error) {
      Logger.error('Error:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(
    userId: string,
    createUserData: CreateUserDTO,
  ): Promise<GeneralResponse<User>> {
    try {
      const { email, name, role } = createUserData;
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          name,
          role,
        },
      });

      return {
        code: 200,
        messsage: 'success',
        data: user,
      };
    } catch (error) {
      Logger.error('Error:', error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteUser(userId: string): Promise<GeneralResponse<User>> {
    try {
      const user = await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });

      return {
        code: 200,
        messsage: 'success',
        data: user,
      };
    } catch (error) {
      Logger.error('Error:', error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
