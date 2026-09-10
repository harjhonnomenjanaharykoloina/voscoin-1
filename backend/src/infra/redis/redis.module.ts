import { Global, Module, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { loadEnvironmentConfig } from '../../config/environment';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        const logger = new Logger('RedisClient');
        const config = loadEnvironmentConfig();

        const client = new Redis({
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password || undefined,
          db: config.redis.db || 0,
          lazyConnect: true,
          retryStrategy: (times) => {
            if (times > 5) {
              logger.warn('Redis retry threshold reached. Using graceful degradation.');
              return null;
            }
            return Math.min(times * 500, 3000);
          },
        });

        client.on('connect', () => {
          logger.log(`Redis connected at ${config.redis.host}:${config.redis.port}`);
        });

        client.on('error', (err) => {
          logger.warn(`Redis connection warning: ${err.message}`);
        });

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
