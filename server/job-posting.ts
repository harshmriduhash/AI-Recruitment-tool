'use server'

// Mock function to simulate database insertion
async function mockDbInsert(data: any) {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock result
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    publishedAt: new Date().toISOString(),
  };
}

export async function createJobPosting(data: any) {
  try {
    // Use the mock function instead of actual database insertion
    const result = await mockDbInsert({
      jobTitle: data.jobTitle,
      jobId: data.jobId,
      description: data.description || '',
      payRate: data.payRate,
      JobType: data.jobType,
      basicQualifications: data.basicQualifications,
      desiredSkills: data.desiredSkills,
      workSchedule: data.workSchedule,
      physicalDemand: data.physicalDemand,
      publishedAt: new Date().toISOString(),
    });
    console.log('Job posting created:', result);
    return result;
  } catch (error) {
    console.error('Failed to create job posting:', error);
    throw error;
  }
}

