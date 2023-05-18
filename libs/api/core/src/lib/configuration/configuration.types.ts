export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export type ApiConfiguration = {
  port: number;
  environment: Environment;
};
