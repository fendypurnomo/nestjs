import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import {Response} from 'express';

import {UserService} from './user.service';
import {UserDto} from './user.dto';
import {User} from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getUsers(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Res() res: Response
  ): Promise<User[] | any> {
    page = page || 1;
    perPage = perPage || 10;
    const users = await this.service.getUsers(page, perPage);
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Res() res: Response
  ): Promise<User | any> {
    const user = await this.service.getUserById(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async createUser(@Body() data: UserDto, @Res() res: Response): Promise<User | any> {
    const newUser = await this.service.createUser(data);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Put(':userId')
  async updateUser(
    @Body() data: UserDto,
    @Param('userId') userId: string,
    @Res() res: Response
  ): Promise<User | any> {
    const updatedUser = await this.service.updateUser(userId, data);
    if (updatedUser) return this.getUser(userId, res);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response): Promise<any> {
    const deletedUser = await this.service.deleteUser(userId);
    return res.status(HttpStatus.OK).json(deletedUser);
  }
}
