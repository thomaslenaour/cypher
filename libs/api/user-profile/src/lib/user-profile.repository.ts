import { Injectable } from '@nestjs/common';
import { UserProfileUniqueFields } from './types';
import { UserProfileObjectType } from './user-profile.model';
import { UpdateUserProfileInput } from './inputs/UpdateUserProfileInput';

@Injectable()
export abstract class UserProfileRepository {
  abstract getUserProfile(
    key: UserProfileUniqueFields,
    value: string
  ): Promise<UserProfileObjectType | null>;

  abstract getUserProfiles(
    key: UserProfileUniqueFields,
    value: string[]
  ): Promise<UserProfileObjectType[]>;

  abstract updateUserProfile(
    userProfileId: string,
    input: UpdateUserProfileInput
  ): Promise<UserProfileObjectType | null>;
}
