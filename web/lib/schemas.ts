import { z } from 'zod';

export const IncidentSchema = z.object({
  summary: z.string().min(5, { message: 'Summary must be at least 5 characters long.' }),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});