import { ApolloDriverConfig } from '@nestjs/apollo';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export type ApiConfiguration = {
  port: number;
  security: SecurityConfiguration;
  environment: Environment;
  graphql: ApolloDriverConfig;
  authentication: AuthenticationConfiguration;
  providers: ProvidersConfiguration;
};

export type SecurityConfiguration = {
  cors: {
    allowedOrigins: RegExp[];
  };
};

export type AuthenticationConfiguration = {
  jwtSecret: string;
};

export type ProvidersConfiguration = {
  livekit: LivekitConfiguration;
};

export type LivekitConfiguration = {
  host: string;
  apiKey: string;
  apiSecret: string;
};
