import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfileObjectType } from './user-profile.model';
import { UserProfileArgs } from './args/user-profile.args';
import { UserProfileUniqueFields } from './types';
import { USER_PROFILE_UNIQUE_FIELDS } from './constants';
import { BadRequestException } from '@nestjs/common';

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
}
