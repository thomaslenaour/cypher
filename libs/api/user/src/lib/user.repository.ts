import { Injectable } from '@nestjs/common';
import { UserObjectType } from './user.model';
import { UserUniqueFields } from './types';

@Injectable()
export abstract class UserRepository {
  abstract getUsers(
    key: UserUniqueFields,
    values: string[]
  ): Promise<UserObjectType[]>;
  abstract follow(followed: string, following: string): Promise<UserObjectType>;
  abstract unfollow(
    unfollowed: string,
    unfollowing: string
  ): Promise<UserObjectType>;
}
