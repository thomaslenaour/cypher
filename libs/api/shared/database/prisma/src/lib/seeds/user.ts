import { Prisma } from '@prisma/client';

export const user: Prisma.UserCreateManyInput[] = [
  {
    id: 'clhxmr6gr000008l2d26y2ix0',
    email: 'user@cypherapp.co',
    emailVerified: new Date('2023-05-21T16:27:06.737Z'),
    name: 'John Doe',
  },
];
