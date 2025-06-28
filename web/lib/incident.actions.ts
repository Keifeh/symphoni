'use server';

import { PrismaClient } from '../app/generated/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { IncidentSchema } from '@/lib/schemas'; // Import from your new schema file

const prisma = new PrismaClient();

export async function createIncident(formData: FormData) {
  // ... the rest of your function remains exactly the same
  const rawFormData = {
    summary: formData.get('summary'),
    priority: formData.get('priority'),
  };

  const validatedFields = IncidentSchema.safeParse(rawFormData);

}
