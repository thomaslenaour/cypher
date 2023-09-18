import { Injectable } from '@nestjs/common';
import { OrmPrismaService } from '@cypher/api/shared/database/orm';
import { UserRepository } from '../user.repository';
import { UserObjectType } from '../user.model';
import { UserUniqueFields } from '../types';

@Injectable()
export class PrismaUserAdapter implements UserRepository {
  constructor(private readonly prisma: OrmPrismaService) {}

  async getUsers(
    key: UserUniqueFields,
    values: string[]
  ): Promise<UserObjectType[]> {
    return await this.prisma.user.findMany({
      where: {
        [key]: {
          in: values,
        },
      },
      include: {
        followedBy: true,
        following: true,
      },
    });
  }

  async follow(followed: string, following: string): Promise<UserObjectType> {
    return await this.prisma.user.update({
      where: {
        id: followed,
      },
      data: {
        followedBy: {
          connect: {
            id: following,
          },
        },
      },
      include: {
        followedBy: true,
        following: true,
      },
    });
  }

  async unfollow(
    unfollowed: string,
    unfollowing: string
  ): Promise<UserObjectType> {
    return await this.prisma.user.update({
      where: {
        id: unfollowed,
      },
      data: {
        followedBy: {
          disconnect: {
            id: unfollowing,
          },
        },
      },
      include: {
        followedBy: true,
        following: true,
      },
    });
  }
}
