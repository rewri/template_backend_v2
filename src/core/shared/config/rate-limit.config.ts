export interface RateLimitConfig {
  // Rate Limiting - Configurações gerais
  RATE_LIMIT_ENABLED: boolean;

  // Rate Limiting - Configuração curta (por segundo)
  RATE_LIMIT_SHORT_TTL: number;
  RATE_LIMIT_SHORT_LIMIT: number;

  // Rate Limiting - Configuração média (por 10 segundos)
  RATE_LIMIT_MEDIUM_TTL: number;
  RATE_LIMIT_MEDIUM_LIMIT: number;

  // Rate Limiting - Configuração longa (por minuto)
  RATE_LIMIT_LONG_TTL: number;
  RATE_LIMIT_LONG_LIMIT: number;
}

export const rateLimitConfig = (): RateLimitConfig => ({
  RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED === 'true' || true,

  RATE_LIMIT_SHORT_TTL: parseInt(process.env.RATE_LIMIT_SHORT_TTL || '1000'),
  RATE_LIMIT_SHORT_LIMIT: parseInt(process.env.RATE_LIMIT_SHORT_LIMIT || '3'),

  RATE_LIMIT_MEDIUM_TTL: parseInt(process.env.RATE_LIMIT_MEDIUM_TTL || '10000'),
  RATE_LIMIT_MEDIUM_LIMIT: parseInt(
    process.env.RATE_LIMIT_MEDIUM_LIMIT || '20',
  ),

  RATE_LIMIT_LONG_TTL: parseInt(process.env.RATE_LIMIT_LONG_TTL || '60000'),
  RATE_LIMIT_LONG_LIMIT: parseInt(process.env.RATE_LIMIT_LONG_LIMIT || '100'),
});
