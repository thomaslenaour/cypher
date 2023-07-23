import { Prisma } from '@prisma/client';

export const user: Prisma.UserCreateManyInput[] = [
  {
    id: 'thoxmr6gr000008l2d26y2tho',
    email: 'thomas@cypherapp.co',
    emailVerified: new Date('2023-05-21T16:27:06.737Z'),
    name: 'Thomas Le Naour',
  },
  {
    id: 'thexmr6gr000008l2d26y2the',
    email: 'theo@cypherapp.co',
    emailVerified: new Date('2023-05-21T16:27:06.737Z'),
    name: 'Théo Delas',
  },
  {
    id: 'sasxmr6gr000008l2d26y2sas',
    email: 'sascha@cypherapp.co',
    emailVerified: new Date('2023-05-21T16:27:06.737Z'),
    name: 'Sascha Salles',
  },
  {
    id: 'alexmr6gr000008l2d26y2ale',
    email: 'alex@cypherapp.co',
    emailVerified: new Date('2023-05-21T16:27:06.737Z'),
    name: 'Alex Boisseau',
  },
];
