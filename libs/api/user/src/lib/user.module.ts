import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { PrismaUserAdapter } from './adapters/prisma-user.adapter';
import { UserProfileModule } from '@cypher/api/user-profile';

@Module({
  imports: [UserProfileModule],
  controllers: [],
  providers: [
    UserResolver,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserAdapter,
    },
  ],
  exports: [],
})
export class UserModule {}
