import { SetMetadata } from '@nestjs/common';

export interface RateLimitConfig {
  ttl?: number;
  limit?: number;
  skipIf?: (context: any) => boolean;
}

export const RATE_LIMIT_KEY = 'rate_limit';
export const RateLimit = (config: RateLimitConfig) =>
  SetMetadata(RATE_LIMIT_KEY, config);
