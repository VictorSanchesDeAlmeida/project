import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { AuthService } from 'src/common/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userDto.email);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const randomPassword = this.authService.generatePassword(10);
    const password = await this.authService.hashPassword(randomPassword);

    const user = await this.userRepository.create({
      ...userDto,
      password,
    });
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
