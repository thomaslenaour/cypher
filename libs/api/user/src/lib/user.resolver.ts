import {
  Args,
  Mutation,
  Parent,
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

@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(
    private readonly service: UserService,
    private readonly userProfileService: UserProfileService
  ) {}

  @Mutation(() => UserObjectType)
  async follow(
    @Args()
    { followed, following }: FollowArgs
  ) {
    return await this.service.follow(followed, following);
  }

  @Mutation(() => UserObjectType)
  async unfollow(
    @Args()
    { unfollowed, unfollowing }: UnfollowArgs
  ) {
    return await this.service.unfollow(unfollowed, unfollowing);
  }

  @ResolveField('profile', () => UserProfileObjectType)
  async userProfile(@Parent() user: UserObjectType) {
    return await this.userProfileService.getUserProfile('userId', user.id);
  }
}
