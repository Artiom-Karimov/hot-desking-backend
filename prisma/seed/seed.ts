import { PrismaClient } from 'generated/prisma/client';
import { seedUser } from './seed-user';

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  try {
    await seedUser(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

void main();
