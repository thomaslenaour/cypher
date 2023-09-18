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
import { UserUniqueFields } from './types';
import { USER_UNIQUE_FIELDS } from './constants';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@cypher/api/authentication';

@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(
    private readonly service: UserService,
    private readonly userProfileService: UserProfileService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserObjectType)
  async follow(
    @Args('followed')
    followed: string,
    @CurrentUser() user: { userId: string }
  ) {
    return await this.service.follow(followed, user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserObjectType)
  async unfollow(
    @Args('unfollowed')
    unfollowed: string,
    @CurrentUser() user: { userId: string }
  ) {
    return await this.service.unfollow(unfollowed, user.userId);
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
