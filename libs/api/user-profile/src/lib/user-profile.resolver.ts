import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfileUniqueFields } from './types';
import { UserProfileObjectType } from './user-profile.model';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query(() => UserProfileObjectType)
  async userProfile(
    @Args('key', { type: () => String }) key: UserProfileUniqueFields,
    @Args('value', { type: () => String }) value: string
  ) {
    return await this.userProfileService.getUserProfile(key, value);
  }
}
