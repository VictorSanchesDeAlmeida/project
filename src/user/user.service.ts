import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/common/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<ResponseUserDto> {
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

  async findAllUsers(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findUserById(id: string): Promise<ResponseUserDto | null> {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return null;
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
