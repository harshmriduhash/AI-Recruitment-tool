// import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  text,
  boolean,
  pgTable,
  varchar,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";


// Schema definitions
export const JobListings = pgTable("job_listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobTitle: text("job_title").notNull(),
  jobId: text("job_id").notNull(),
  description: text("description"),
  payRate: numeric("pay_rate").notNull(),
  jobType: text("job_type").notNull(),
  basicQualifications: text("basic_qualifications").notNull(),
  desiredSkills: text("desired_skills").notNull(),
  workSchedule: text("work_schedule").notNull(),
  physicalDemand: text("physical_demand").notNull(),
  publishedAt: timestamp("published_at").notNull(),
});

// Export the schema for use in other files
export type JobListing = typeof JobListings.$inferSelect;
export type NewJobListing = typeof JobListings.$inferInsert;