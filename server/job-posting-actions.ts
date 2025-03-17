'use server'

import { z } from 'zod'
import { addJobPosting } from '@/server/db/queries'
import { NewJobListing } from '@/server/db/schemas'

const jobPostingSchema = z.object({
  jobTitle: z.string().min(2),
  jobId: z.string().min(2),
  description: z.string().optional(),
  payRate: z.number().positive(),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Temporary"]),
  basicQualifications: z.string().min(10),
  desiredSkills: z.string().min(10),
  workSchedule: z.string().min(2),
  physicalDemand: z.enum(["Light", "Moderate", "Heavy"]),
})

export async function createJobPosting(data: z.infer<typeof jobPostingSchema>) {
  try {
    const validatedData = jobPostingSchema.parse(data)   
    const result = await addJobPosting(validatedData as Omit<NewJobListing, 'id' | 'publishedAt'>)
    return result
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
    }
    if (error instanceof Error) {
      throw new Error(`Failed to create job posting: ${error.message}`)
    }
    throw new Error('An unexpected error occurred while creating the job posting')
  }
}


export async function updateJobPosting(id: string, data: z.infer<typeof jobPostingSchema>) {
  try {
    const validatedData = jobPostingSchema.parse(data)
    // TODO: Implement update functionality using Drizzle ORM
    // For now, we'll just return a mock result
    const result = {
      id,
      ...validatedData,
      updatedAt: new Date().toISOString(),
    }
    console.log('Job posting updated:', result)
    return result
  } catch (error) {
    console.error('Failed to update job posting:', error)
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}

