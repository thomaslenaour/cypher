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
  providers: ProvidersConfiguration;
};

export interface ProvidersConfiguration {
  passwordEncryption: PasswordEncryptionConfiguration;
}

export interface PasswordEncryptionConfiguration {
  saltOrRounds: number;
}
