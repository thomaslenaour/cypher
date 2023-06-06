import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';
import { AuthenticationModule } from '@cypher/api/authentication';

import { AppResolver } from './app.resolver';

@Module({
  imports: [CoreModule, AuthenticationModule],
  providers: [AppResolver],
})
export class AppModule {}
