import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AppThrottleGuard extends ThrottlerGuard {
  protected errorMessage = 'Rate limit exceeded. Try again later.';
}
