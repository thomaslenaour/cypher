import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';
import { AuthenticationModule } from '@cypher/api/authentication';
import { RoomModule } from '@cypher/api/room';

import { AppResolver } from './app.resolver';

@Module({
  imports: [CoreModule, AuthenticationModule, RoomModule],
  providers: [AppResolver],
})
export class AppModule {}
