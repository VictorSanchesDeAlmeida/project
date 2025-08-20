import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/common/bcrypt/bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthService],
})
export class UserModule {}
