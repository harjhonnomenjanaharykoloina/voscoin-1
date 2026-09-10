import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully to MongoDB');
    } catch (error) {
      this.logger.warn(
        `Prisma could not connect to MongoDB on startup: ${(error as Error).message}. Will retry on queries.`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from MongoDB');
  }

  /**
   * Helper for multi-tenant queries: ensures workspace isolation
   */
  tenantScope(workspaceId: string) {
    if (!workspaceId) {
      throw new Error('Workspace ID is required for multi-tenant queries');
    }
    return { workspaceId };
  }
}
