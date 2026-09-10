import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { REDIS_CLIENT } from '../infra/redis/redis.module';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  @Get()
  async check() {
    let mongoStatus = 'unknown';
    let redisStatus = 'unknown';

    try {
      // Prisma MongoDB ping
      await this.prisma.$runCommandRaw({ ping: 1 });
      mongoStatus = 'up';
    } catch (e) {
      mongoStatus = 'down (waiting for replica/connection)';
    }

    try {
      const ping = await this.redis.ping();
      redisStatus = ping === 'PONG' ? 'up' : 'unreachable';
    } catch (e) {
      redisStatus = 'down (waiting for server)';
    }

    return {
      status: 'ok',
      service: 'NextCRM NestJS Backend',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      components: {
        mongodb: {
          status: mongoStatus,
          provider: 'MongoDB + Prisma ORM',
        },
        redis: {
          status: redisStatus,
          provider: 'Redis + BullMQ',
        },
      },
    };
  }
}
