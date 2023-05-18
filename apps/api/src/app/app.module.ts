import { Module } from '@nestjs/common';

import { CoreModule } from '@cypher/api/core';

@Module({
  imports: [CoreModule],
})
export class AppModule {}
