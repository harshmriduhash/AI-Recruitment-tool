import { db } from "./drizzle";
import { JobListings, NewJobListing } from "@/server/db/schemas";
import { v4 as uuidv4 } from "uuid";

export async function addJobPosting(
  jobPosting: Omit<NewJobListing, "id" | "publishedAt">
) {
  try {
    const newJobPosting: NewJobListing = {
      ...jobPosting,
      id: uuidv4(),
      publishedAt: new Date(),
    };

    const [insertedJob] = await db
      .insert(JobListings)
      .values(newJobPosting)
      .returning();
    return insertedJob;
  } catch (error) {
    throw new Error("Failed to add job posting");
  }
}
