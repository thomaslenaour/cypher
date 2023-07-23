import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileUniqueFields } from './types';
import { UserProfileObjectType } from './user-profile.model';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async getUserProfile(
    key: UserProfileUniqueFields,
    value: string
  ): Promise<UserProfileObjectType> {
    const userProfile = await this.userProfileRepository.getUserProfile(
      key,
      value
    );

    if (userProfile === null)
      throw new NotFoundException(
        `No user profile found with ${key} equals to ${value}`
      );

    return userProfile;
  }
}
