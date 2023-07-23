import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';
import { AuthenticationModule } from '@cypher/api/authentication';
import { RoomModule } from '@cypher/api/room';

import { AppResolver } from './app.resolver';
import { UserProfileModule } from '@cypher/api/user-profile';

@Module({
  imports: [CoreModule, AuthenticationModule, RoomModule, UserProfileModule],
  providers: [AppResolver],
})
export class AppModule {}
