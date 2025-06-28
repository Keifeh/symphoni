// prisma/seeds/configitem.seed.ts

import type { PrismaClient, User, CiClass } from '../../app/generated/prisma';

// Helper function to get a random item from an array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// The function now accepts the Prisma Client instance and the list of existing users
export async function seedConfigItems(prisma: PrismaClient, users: User[]) {
  console.log('Seeding configuration items...');
  
  const potentialOwners = users.filter(user => user.role === 'USER');
  const totalOwners = potentialOwners.length;

  if (totalOwners === 0) {
    console.warn('Warning: No non-admin users found to assign as owners. All CIs will be unassigned.');
  }

  const ciTypesToGenerate: { class: CiClass, prefix: string, count: number, brands: string[] }[] = [
    { class: 'Laptop',       prefix: 'LAP',  count: 50, brands: ['Dell', 'HP', 'Lenovo', 'Apple'] },
    { class: 'Desktop',      prefix: 'DESK', count: 20, brands: ['Dell', 'HP'] },
    { class: 'Mobile_Phone', prefix: 'MOB',  count: 20, brands: ['Apple', 'Samsung', 'Google'] },
    { class: 'Tablet',       prefix: 'TAB',  count: 10, brands: ['Apple', 'Samsung'] }
  ];

  const itemsToCreate = [];
  let idCounter = 1;

  for (const type of ciTypesToGenerate) {
    for (let i = 0; i < type.count; i++) {
      const brand = getRandomItem(type.brands);
      const paddedId = idCounter.toString().padStart(4, '0');
      const ciName = `${brand.toUpperCase()}-${type.prefix}-${paddedId}`;
      
      itemsToCreate.push({
        name: ciName,
        ciClass: type.class,
      });
      idCounter++;
    }
  }

  let ownedCount = 0;
  const totalItems = itemsToCreate.length;
  const targetOwnedCount = Math.floor(totalItems * 0.8);
  const createdItems = [];

  for (const item of itemsToCreate) {
    let ownerId: string | null = null;
    
    if (ownedCount < targetOwnedCount && totalOwners > 0) {
      const randomOwnerIndex = Math.floor(Math.random() * totalOwners);
      ownerId = potentialOwners[randomOwnerIndex].sysId;
      ownedCount++;
    }

    const ci = await prisma.configurationItem.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        ciClass: item.ciClass,
        ...(ownerId ? { ciOwner: { connect: { sysId: ownerId } } } : {})
      },
    });
    createdItems.push(ci);
  }
  
  console.log(`${totalItems} configuration items seeded. ${ownedCount} are owned.`);
  return createdItems; // <-- The important change is here
}
