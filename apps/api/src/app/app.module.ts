import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';

import { AppResolver } from './app.resolver';

@Module({
  imports: [CoreModule],
  providers: [AppResolver],
})
export class AppModule {}
