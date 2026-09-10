import { Global, Module, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { loadEnvironmentConfig } from '../../config/environment';

export const QUEUE_NAMES = {
  SEND_WHATSAPP: 'send-whatsapp',
  SEND_MESSENGER: 'send-messenger',
  SEND_EMAIL: 'send-email',
  PROCESS_WEBHOOK: 'process-webhook',
  PROCESS_CAMPAIGN: 'process-campaign',
  PROCESS_MEDIA: 'process-media',
  GENERATE_AI_RESPONSE: 'generate-ai-response',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export interface BullMqQueueRegistry {
  getQueue(name: QueueName): Queue | null;
}

export const BULLMQ_REGISTRY = 'BULLMQ_REGISTRY';

@Global()
@Module({
  providers: [
    {
      provide: BULLMQ_REGISTRY,
      useFactory: () => {
        const logger = new Logger('BullMqRegistry');
        const config = loadEnvironmentConfig();
        const queues = new Map<string, Queue>();

        const connection = {
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password,
          db: config.redis.db,
        };

        Object.values(QUEUE_NAMES).forEach((queueName) => {
          try {
            const queue = new Queue(queueName, {
              connection,
              defaultJobOptions: {
                attempts: 3,
                backoff: {
                  type: 'exponential',
                  delay: 1000,
                },
                removeOnComplete: true,
                removeOnFail: false,
              },
            });
            queues.set(queueName, queue);
          } catch (error) {
            logger.warn(`Could not initialize BullMQ queue [${queueName}]: ${(error as Error).message}`);
          }
        });

        logger.log(`Initialized BullMQ queues: ${Object.values(QUEUE_NAMES).join(', ')}`);

        return {
          getQueue: (name: QueueName): Queue | null => queues.get(name) || null,
        };
      },
    },
  ],
  exports: [BULLMQ_REGISTRY],
})
export class BullMqModule {}
