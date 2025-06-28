// app/incidents/page.tsx

import prisma from '@/lib/prisma';
import { IncidentTable } from '@/components/incidents/incident-table';
import { Incident, IncidentSchema } from '@/lib/schemas';

// This is a Server Component, so we can fetch data directly
async function getIncidents(): Promise<Incident[]> {
  const incidents = await prisma.incident.findMany({
    select: {
      sysId: true,
      summary: true,
      status: true,
      priority: true,
      updatedAt: true,
      originUser: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // 1. Format the date to a string to pass it to a Client Component.
  // 2. Parse the data with our Zod schema to ensure it's in the correct shape.
  const formattedData = incidents.map((inc) => ({
    ...inc,
    updatedAt: inc.updatedAt.toISOString(),
  }));

    // This validates the data at runtime and returns it.
    return IncidentSchema.array().parse(formattedData);
}

export default async function IncidentsPage() {
  const data = await getIncidents();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Incidents</h1>
      <IncidentTable data={data} />
    </div>
  );
}
