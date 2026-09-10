import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthRateLimitGuard } from './guards/auth-rate-limit.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard, AuthRateLimitGuard],
  exports: [AuthService, AccessTokenGuard],
})
export class AuthModule {}
