import { PrismaClient } from '@prisma/client';
import { UncapitalizedModelName, models } from './seeds';

const prisma = new PrismaClient();

const main = async () => {
  process.stdout.write('\n');
  console.log('🦋 • Starting database seeding');
  process.stdout.write('\n');

  for (const [model, values] of Object.entries(models)) {
    const numberOfItems = values?.length;

    if (numberOfItems) {
      console.log(
        `🌷 • Starting generate ${numberOfItems} ${model}${
          numberOfItems > 1 ? 's' : ''
        }...`
      );

      for (const value of values) {
        if (value?.id) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await prisma[model as UncapitalizedModelName].upsert({
            where: {
              id: value.id,
            },
            create: value,
            update: value,
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await prisma[model as UncapitalizedModelName].create({
            data: value,
          });
        }
      }
    }

    console.log(
      `✅ • ${numberOfItems} element${
        numberOfItems > 1 ? 's' : ''
      } in ${model} inserted`
    );
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
