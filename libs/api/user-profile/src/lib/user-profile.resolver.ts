import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfileObjectType } from './user-profile.model';
import { UserProfileArgs } from './args/user-profile.args';
import { UserProfileUniqueFields } from './types';
import { USER_PROFILE_UNIQUE_FIELDS } from './constants';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@cypher/api/authentication';
import { UpdateUserProfileInput } from './inputs/UpdateUserProfileInput';

@Resolver()
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query(() => UserProfileObjectType)
  async userProfile(@Args() { key, value }: UserProfileArgs) {
    if (!(USER_PROFILE_UNIQUE_FIELDS as readonly string[]).includes(key)) {
      throw new BadRequestException(
        `key should be equals to one of these values : [${USER_PROFILE_UNIQUE_FIELDS.join(
          ', '
        )}]`
      );
    }

    return await this.userProfileService.getUserProfile(
      key as UserProfileUniqueFields,
      value
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfileObjectType)
  async updateUserProfile(
    @Args('data') data: UpdateUserProfileInput,
    @CurrentUser() user: { userId: string }
  ) {
    return await this.userProfileService.updateUserProfile(user.userId, {
      ...data,
    });
  }
}
