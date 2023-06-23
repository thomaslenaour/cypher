import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';
import { AuthenticationModule } from '@cypher/api/authentication';

import { AppResolver } from './app.resolver';
import { RoomModule } from '@cypher/api/room';

@Module({
  imports: [CoreModule, AuthenticationModule, RoomModule],
  providers: [AppResolver],
})
export class AppModule {}
