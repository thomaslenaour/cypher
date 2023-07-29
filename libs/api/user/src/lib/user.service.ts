import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserUniqueFields } from './types';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers(key: UserUniqueFields, values: string[]) {
    return await this.repository.getUsers(key, values);
  }

  async follow(followed: string, following: string) {
    if (followed === following)
      throw new BadRequestException(
        'followed and following values cannot be equal'
      );

    if ((await this.getUsers('id', [followed, following])).length !== 2)
      throw new BadRequestException(
        `less than 2 users found for these values : ${followed}, ${following}`
      );

    return await this.repository.follow(followed, following);
  }

  async unfollow(unfollowed: string, unfollowing: string) {
    if (unfollowed === unfollowing)
      throw new BadRequestException(
        'unfollowed and unfollowing values cannot be equal'
      );

    if ((await this.getUsers('id', [unfollowed, unfollowing])).length !== 2)
      throw new BadRequestException(
        `less than 2 users found for these values : ${unfollowed}, ${unfollowing}`
      );

    return await this.repository.unfollow(unfollowed, unfollowing);
  }
}
