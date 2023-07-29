import { Injectable } from '@nestjs/common';
import { OrmPrismaService } from '@cypher/api/shared/database/orm';
import { UserProfileUniqueFields } from '../types';
import { UserProfileRepository } from '../user-profile.repository';
import { UserProfileObjectType } from '../user-profile.model';

@Injectable()
export class UserProfilePrismaAdapter implements UserProfileRepository {
  constructor(private readonly prisma: OrmPrismaService) {}

  public async getUserProfile(
    key: UserProfileUniqueFields,
    value: string
  ): Promise<UserProfileObjectType | null> {
    return await this.prisma.userProfile.findUnique({
      where: {
        [key as string]: value,
      },
    });
  }
}
