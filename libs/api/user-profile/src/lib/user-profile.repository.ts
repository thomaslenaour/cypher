import { Injectable } from '@nestjs/common';
import { UserProfileUniqueFields } from './types';
import { UserProfileObjectType } from './user-profile.model';

@Injectable()
export abstract class UserProfileRepository {
  abstract getUserProfile(
    key: UserProfileUniqueFields,
    value: string
  ): Promise<UserProfileObjectType | null>;
}
