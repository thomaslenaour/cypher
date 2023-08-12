import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';

import { OrmModule } from '@cypher/api/shared/database/orm';

import {
  ApiConfiguration,
  configuration,
  validateConfiguration,
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
      validate: validateConfiguration,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig =
          configService.get<ApiConfiguration['graphql']>('graphql');
        if (!graphqlConfig) {
          throw new Error('Missing GraphQL configuration');
        }
        return graphqlConfig;
      },
      inject: [ConfigService],
    }),
    OrmModule,
    ScheduleModule.forRoot(),
  ],
})
export class CoreModule {}
