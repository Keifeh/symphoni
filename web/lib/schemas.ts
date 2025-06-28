import { z } from 'zod';
import { IncidentStatus } from '@/app/generated/prisma';

export const IncidentSchema = z.object({
  sysId: z.string().uuid(),
  summary: z.string(),
  status: z.nativeEnum(IncidentStatus),
  priority: z.string(),
  updatedAt: z.string(), // The date is a string because we serialize it on the server.
  originUser: z.object({
    username: z.string(),
  }),
});

export type Incident = z.infer<typeof IncidentSchema>;