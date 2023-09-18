import { Injectable } from '@nestjs/common';
import { OrmPrismaService } from '@cypher/api/shared/database/orm';
import { UserProfileUniqueFields } from '../types';
import { UserProfileRepository } from '../user-profile.repository';
import { UserProfileObjectType } from '../user-profile.model';
import { UpdateUserProfileInput } from '../inputs/UpdateUserProfileInput';

@Injectable()
export class UserProfilePrismaAdapter implements UserProfileRepository {
  constructor(private readonly prisma: OrmPrismaService) {}

  public async getUserProfile(
    key: UserProfileUniqueFields,
    value: string
  ): Promise<UserProfileObjectType | null> {
    return await this.prisma.userProfile.findFirst({
      where: {
        [key]: value,
      },
    });
  }

  public async updateUserProfile(
    userProfileId: string,
    input: UpdateUserProfileInput
  ): Promise<UserProfileObjectType | null> {
    return await this.prisma.userProfile.update({
      where: {
        id: userProfileId,
      },
      data: {
        ...input,
      },
    });
  }
}
