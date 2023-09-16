import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserObjectType } from './user.model';
import {
  UserProfileObjectType,
  UserProfileService,
} from '@cypher/api/user-profile';
import { FollowArgs } from './args/follow.args';
import { UnfollowArgs } from './args/unfollow.args';
import { UserUniqueFields } from './types';
import { USER_UNIQUE_FIELDS } from './constants';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(
    private readonly service: UserService,
    private readonly userProfileService: UserProfileService
  ) {}

  @Mutation(() => UserObjectType)
  async follow(
    @Args('data')
    { followed, following }: FollowArgs
  ) {
    return await this.service.follow(followed, following);
  }

  @Mutation(() => UserObjectType)
  async unfollow(
    @Args('data')
    { unfollowed, unfollowing }: UnfollowArgs
  ) {
    return await this.service.unfollow(unfollowed, unfollowing);
  }

  @Query(() => UserObjectType)
  async user(@Args('key') key: string, @Args('value') value: string) {
    if (!(USER_UNIQUE_FIELDS as readonly string[]).includes(key)) {
      throw new BadRequestException(
        `key should be equals to one of these values : [${USER_UNIQUE_FIELDS.join(
          ', '
        )}]`
      );
    }
    return await this.service.getUser(key as UserUniqueFields, value);
  }

  @ResolveField('profile', () => UserProfileObjectType)
  async userProfile(@Parent() user: UserObjectType) {
    return await this.userProfileService.getUserProfile('userId', user.id);
  }
}
