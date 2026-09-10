import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infra/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Role, JwtPayload } from './auth.types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email address already exists');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    // Create Workspace and User within tenant boundary
    const slug = dto.workspaceName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const workspace = await this.prisma.workspace.create({
      data: {
        name: dto.workspaceName,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        pipelines: {
          create: {
            name: 'Standard Sales Pipeline',
            isDefault: true,
            stages: {
              create: [
                { name: 'Lead / Inbound', order: 1, probability: 10, color: '#64748b' },
                { name: 'Contacted', order: 2, probability: 25, color: '#3b82f6' },
                { name: 'Meeting Scheduled', order: 3, probability: 50, color: '#8b5cf6' },
                { name: 'Proposal Sent', order: 4, probability: 75, color: '#f59e0b' },
                { name: 'Negotiation', order: 5, probability: 90, color: '#06b6d4' },
                { name: 'Closed Won', order: 6, probability: 100, color: '#10b981' },
              ],
            },
          },
        },
      },
    });

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: Role.OWNER,
        workspaceId: workspace.id,
      },
    });

    // Record audit log
    await this.prisma.auditLog.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        action: 'USER_REGISTER',
        resource: 'User',
        resourceId: user.id,
        details: { email: user.email, workspace: workspace.name },
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, workspace.id, user.role as Role);

    return {
      success: true,
      message: 'Workspace and user registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        workspace: {
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
        },
        ...tokens,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { workspace: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        workspaceId: user.workspaceId,
        userId: user.id,
        action: 'AUTH_LOGIN',
        resource: 'User',
        resourceId: user.id,
      },
    });

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.workspaceId,
      user.role as Role,
    );

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        workspace: {
          id: user.workspace.id,
          name: user.workspace.name,
          slug: user.workspace.slug,
        },
        ...tokens,
      },
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_key',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User account no longer active');
      }

      return this.generateTokens(
        user.id,
        user.email,
        user.workspaceId,
        user.role as Role,
      );
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(
    userId: string,
    email: string,
    workspaceId: string,
    role: Role,
  ) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      workspaceId,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production_key',
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_key',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 900, // 15 minutes in seconds
    };
  }
}
