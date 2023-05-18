import { ApiConfiguration, Environment } from './configuration.types';

export default (): ApiConfiguration => ({
  port: parseInt(process.env.PORT),
  environment: process.env.APP_ENV as Environment,
});
