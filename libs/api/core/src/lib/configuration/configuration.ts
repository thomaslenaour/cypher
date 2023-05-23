import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { ApiConfiguration, Environment } from './configuration.types';

const isDevelopment = process.env.APP_ENV === Environment.Development;

export default (): ApiConfiguration => ({
  port: parseInt(process.env.PORT),
  environment: process.env.APP_ENV as Environment,
  graphql: {
    sortSchema: true,
    playground: false,
    autoSchemaFile: true,
    plugins: isDevelopment ? [ApolloServerPluginLandingPageLocalDefault()] : [],
  },
  providers: {
    passwordEncryption: {
      saltOrRounds: 10,
    },
  },
});
