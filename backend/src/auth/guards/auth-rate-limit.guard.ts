import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../../infra/redis/redis.module';

@Injectable()
export class AuthRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(AuthRateLimitGuard.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip || request.headers['x-forwarded-for'] || 'anonymous';
    const route = request.path;
    const key = `ratelimit:auth:${ip}:${route}`;

    try {
      // Allow up to 10 attempts per minute per IP on authentication routes
      const attempts = await this.redis.incr(key);
      if (attempts === 1) {
        await this.redis.expire(key, 60);
      }

      if (attempts > 10) {
        this.logger.warn(`Rate limit exceeded for IP: ${ip} on route: ${route}`);
        throw new HttpException(
          {
            success: false,
            message: 'Too many authentication attempts. Please try again after 60 seconds.',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    } catch (err) {
      if (err instanceof HttpException) throw err;
      // In case Redis is temporarily disconnected, log and allow gracefully
      this.logger.warn(`Rate limiter Redis bypass: ${(err as Error).message}`);
    }

    return true;
  }
}
