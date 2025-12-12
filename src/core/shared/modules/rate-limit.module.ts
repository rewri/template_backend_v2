import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { rateLimitConfig } from '../config/rate-limit.config';
import { AppThrottleGuard } from '../guards/throttle.guard';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => {
        const config = rateLimitConfig();

        return [
          {
            name: 'short',
            ttl: config.RATE_LIMIT_SHORT_TTL,
            limit: config.RATE_LIMIT_SHORT_LIMIT,
          },
          {
            name: 'medium',
            ttl: config.RATE_LIMIT_MEDIUM_TTL,
            limit: config.RATE_LIMIT_MEDIUM_LIMIT,
          },
          {
            name: 'long',
            ttl: config.RATE_LIMIT_LONG_TTL,
            limit: config.RATE_LIMIT_LONG_LIMIT,
          },
        ];
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppThrottleGuard,
    },
  ],
  exports: [ThrottlerModule],
})
export class RateLimitModule {}
