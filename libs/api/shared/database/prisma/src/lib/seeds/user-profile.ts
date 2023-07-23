import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { user } from './user';

export const userProfile: Prisma.UserProfileCreateManyInput[] = user
  .filter((u) => u.id)
  .map((u) => {
    return {
      pseudo: faker.internet.userName(u.name ?? ''),
      userId: u.id!,
      bannerUrl: faker.image.url({
        width: 1200,
      }),
      profileUrl: faker.image.avatar(),
      punchline: faker.lorem.sentence(),
    };
  });
