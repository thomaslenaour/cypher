import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileUniqueFields } from './types';
import { UserProfileObjectType } from './user-profile.model';
import { UpdateUserProfileInput } from './inputs/UpdateUserProfileInput';
import { Prisma } from '@prisma/client';

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

  async getUserProfiles(
    key: UserProfileUniqueFields,
    values: string[]
  ): Promise<UserProfileObjectType[]> {
    return await this.userProfileRepository.getUserProfiles(key, values);
  }

  async updateUserProfile(
    userId: string,
    input: UpdateUserProfileInput
  ): Promise<UserProfileObjectType | null> {
    const userProfile = await this.getUserProfile('userId', userId);

    try {
      return await this.userProfileRepository.updateUserProfile(
        userProfile.id,
        input
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new Error(`UNIQUE_PSEUDO`);
        }
      }

      throw error;
    }
  }
}
