import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.prisma.users.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return users;
  }

  async findByEmail(email: string): Promise<ResponseUserDto | null> {
    const user = await this.prisma.users.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: { email },
    });
    return user;
  }

  async findById(id: number): Promise<ResponseUserDto | null> {
    const user = await this.prisma.users.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: { id },
    });

    return user;
  }
}
