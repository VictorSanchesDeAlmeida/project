import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, UserModule, TaskModule],
  controllers: [HealthcheckController],
  providers: [AppService],
})
export class AppModule {}
