import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { BullMqModule } from './infra/redis/bullmq.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { loadEnvironmentConfig } from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvironmentConfig],
    }),
    PrismaModule,
    RedisModule,
    BullMqModule,
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
