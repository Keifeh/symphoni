// prisma/seeds/incident.seed.ts

import type { PrismaClient, User, ConfigurationItem, IncidentStatus } from '../../app/generated/prisma';

// Helper function to get a random item from an array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedIncidents(prisma: PrismaClient, users: User[], configItems: ConfigurationItem[]) {
  console.log('Seeding incidents...');

  const incidentSummaries = [
    "User cannot log in to email",
    "Laptop running extremely slow",
    "Printer in finance department is offline",
    "Unable to access shared network drive",
    "Application is crashing on startup",
    "Request for new software installation",
    "Mobile phone unable to connect to Wi-Fi",
    "Monitor is flickering",
  ];

  const statuses: IncidentStatus[] = ['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED'];

  // Ensure we have users and CIs to link to
  if (users.length === 0) {
    console.warn('No users found, cannot create incidents.');
    return;
  }
  if (configItems.length === 0) {
    console.warn('No configuration items found, cannot link incidents to CIs.');
    return;
  }

  for (let i = 0; i < 100; i++) {
    const originUser = getRandomItem(users);
    const assignedToUser = getRandomItem(users.filter(u => u.role === 'USER')); // Assign to non-admins
    const summary = getRandomItem(incidentSummaries);
    const status = getRandomItem(statuses);

    let linkedCiId: string | null = null;
    // Link a CI for the first 90 incidents (90%)
    if (i < 90) {
      linkedCiId = getRandomItem(configItems).sysId;
    }

    await prisma.incident.create({
      data: {
        summary: `${summary} (User: ${originUser.username})`,
        status: status,
        originUser: {
          connect: { sysId: originUser.sysId },
        },
        assignedTo: {
          connect: { sysId: assignedToUser.sysId },
        },
        // Conditionally connect the CI if one was selected
        ...(linkedCiId ? { configurationItems: { connect: { sysId: linkedCiId } } } : {})
      },
    });
  }

  console.log('100 incidents seeded.');
}
