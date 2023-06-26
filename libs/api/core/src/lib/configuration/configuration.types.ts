import { ApolloDriverConfig } from '@nestjs/apollo';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export type ApiConfiguration = {
  port: number;
  environment: Environment;
  graphql: ApolloDriverConfig;
  authentication: AuthenticationConfiguration;
  providers: ProvidersConfiguration;
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
