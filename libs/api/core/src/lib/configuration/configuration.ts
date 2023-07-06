import { ApiConfiguration, Environment } from './configuration.types';

const isDevelopment = process.env.APP_ENV === Environment.Development;

export default (): ApiConfiguration => ({
  port: parseInt(process.env.PORT),
  environment: process.env.APP_ENV as Environment,
  graphql: {
    sortSchema: true,
    playground: isDevelopment,
    autoSchemaFile: true,
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
  providers: {
    livekit: {
      host: process.env.LIVEKIT_HOST,
      apiKey: process.env.LIVEKIT_API_KEY,
      apiSecret: process.env.LIVEKIT_API_SECRET,
    },
  },
});
