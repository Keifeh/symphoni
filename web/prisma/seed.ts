// prisma/seed.ts

import { PrismaClient } from '../app/generated/prisma';
import { seedUsers } from './seeds/user.seed';
import { seedConfigItems } from './seeds/configitem.seed';
import { seedIncidents } from './seeds/incident.seed'; // Import the new incident seeder

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // To ensure a clean slate, we delete existing incidents and CIs.
  // We delete incidents first because they might depend on CIs.
  await prisma.incident.deleteMany();
  await prisma.configurationItem.deleteMany();
  console.log('Deleted existing incidents and configuration items.');

  // 1. Seed users first and get the created user records
  const users = await seedUsers(prisma);
  
  // 2. Seed CIs and get the created asset records
  const configItems = await seedConfigItems(prisma, users);
  
  // 3. Seed incidents, passing in the users and CIs to create relationships
  await seedIncidents(prisma, users, configItems);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the database connection
    await prisma.$disconnect();
  });
