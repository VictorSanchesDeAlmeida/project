import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<any> {
    const result = await this.userService.createUser(userDto);
    return {
      result: 'success',
      statusCode: 201,
      message: 'User created successfully',
      user: result,
    };
  }

  @Get()
  async findAllUsers(): Promise<any> {
    const users = await this.userService.findAllUsers();
    return {
      result: 'success',
      statusCode: 200,
      message: 'Users retrieved successfully',
      users,
    };
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);

    return {
      result: 'success',
      statusCode: 200,
      message: 'Users retrieved successfully',
      user,
    };
  }
}
