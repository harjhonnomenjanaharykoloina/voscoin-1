export interface EnvironmentConfig {
  nodeEnv: string;
  port: number;
  appName: string;
  databaseUrl: string;
  redis: {
    host: string;
    port: number;
    password?: string;
    db?: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  cors: {
    origins: string[];
  };
  channels: {
    whatsapp: {
      apiUrl: string;
      accessToken?: string;
      phoneNumberId?: string;
      webhookVerifyToken?: string;
    };
    messenger: {
      apiUrl: string;
      pageToken?: string;
      verifyToken?: string;
    };
    email: {
      provider: string;
      smtpHost: string;
      smtpPort: number;
      smtpUser?: string;
      smtpPass?: string;
      smtpFrom: string;
    };
  };
  ai: {
    provider: string;
    openaiApiKey?: string;
    model: string;
  };
}

export const loadEnvironmentConfig = (): EnvironmentConfig => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  appName: process.env.APP_NAME || 'NextCRM',
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/nextcrm',
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:4200').split(','),
  },
  channels: {
    whatsapp: {
      apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v20.0',
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    },
    messenger: {
      apiUrl: process.env.META_MESSENGER_API_URL || 'https://graph.facebook.com/v20.0',
      pageToken: process.env.META_MESSENGER_PAGE_TOKEN,
      verifyToken: process.env.META_MESSENGER_VERIFY_TOKEN,
    },
    email: {
      provider: process.env.EMAIL_PROVIDER || 'smtp',
      smtpHost: process.env.SMTP_HOST || 'localhost',
      smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS,
      smtpFrom: process.env.SMTP_FROM || 'NextCRM <no-reply@nextcrm.local>',
    },
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'openai',
    openaiApiKey: process.env.OPENAI_API_KEY,
    model: process.env.AI_MODEL || 'gpt-4o-mini',
  },
});
