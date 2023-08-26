import { Module } from '@nestjs/common';
import { UserProfileResolver } from './user-profile.resolver';
import { UserProfileService } from './user-profile.service';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfilePrismaAdapter } from './adapters/prisma-user-profile.adapter';

@Module({
  controllers: [],
  providers: [
    UserProfileResolver,
    UserProfileService,
    {
      provide: UserProfileRepository,
      useClass: UserProfilePrismaAdapter,
    },
  ],
  exports: [UserProfileService],
})
export class UserProfileModule {}
export { UserProfileObjectType } from './user-profile.model';
export { UserProfileService } from './user-profile.service';
