import { Prisma } from '@prisma/client';

import { user } from './user';
import { room } from './room';
import { userProfile } from './user-profile';

export type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const models: Partial<Record<UncapitalizedModelName, any[]>> = {
  user,
  userProfile,
  room,
};
