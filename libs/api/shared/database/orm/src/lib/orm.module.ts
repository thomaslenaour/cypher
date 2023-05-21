import { Global, Module } from '@nestjs/common';

import { OrmPrismaService } from './orm.prisma.service';

@Global()
@Module({
  providers: [OrmPrismaService],
  exports: [OrmPrismaService],
})
export class OrmModule {}
