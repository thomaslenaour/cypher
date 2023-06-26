import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

import { Environment } from './configuration.types';

type HasKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: any;
};

class EnvironmentVariables implements HasKeys<NodeJS.ProcessEnv> {
  @IsString()
  NODE_ENV: string;

  @IsEnum(Environment)
  APP_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  LIVEKIT_HOST: string;

  @IsString()
  LIVEKIT_API_KEY: string;

  @IsString()
  LIVEKIT_API_SECRET: string;
}

export function validateConfiguration(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
