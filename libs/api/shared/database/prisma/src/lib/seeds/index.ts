import { Prisma } from '@prisma/client';

import { user } from './user';

export type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const models: Partial<Record<UncapitalizedModelName, any[]>> = {
  user,
};
