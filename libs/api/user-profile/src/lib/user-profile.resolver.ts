import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfileObjectType } from './user-profile.model';
import { UserProfileArgs } from './args/user-profile.args';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query(() => UserProfileObjectType)
  async userProfile(@Args() { key, value }: UserProfileArgs) {
    return await this.userProfileService.getUserProfile(key, value);
  }
}
