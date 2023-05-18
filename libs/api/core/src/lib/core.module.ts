import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration, validateConfiguration } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
      validate: validateConfiguration,
    }),
  ],
})
export class CoreModule {}
