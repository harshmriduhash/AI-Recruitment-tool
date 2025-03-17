'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { JobPostingForm } from '@/components/job-posting-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

// Mock job listings data
const mockJobListings = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    jobId: 'SE-001',
    description: 'We are seeking a talented Software Engineer to join our team...',
    payRate: 100000,
    jobType: 'Full-time',
    department: 'Engineering',
    basicQualifications: 'Bachelor\'s degree in Computer Science or related field...',
    desiredSkills: 'Experience with React, Node.js, and cloud technologies...',
    workSchedule: 'Monday-Friday, 9AM-5PM',
    physicalDemand: 'Light',
    publishedAt: '2023-05-15T10:00:00Z',
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    jobId: 'PM-001',
    description: 'We are looking for an experienced Product Manager to lead our product development efforts...',
    payRate: 110000,
    jobType: 'Full-time',
    department: 'Product',
    basicQualifications: 'Bachelor\'s degree in Business, Computer Science, or related field...',
    desiredSkills: 'Experience with Agile methodologies, product lifecycle management...',
    workSchedule: 'Monday-Friday, 9AM-5PM',
    physicalDemand: 'Light',
    publishedAt: '2023-05-16T09:00:00Z',
  },
  {
    id: '3',
    jobTitle: 'UX Designer',
    jobId: 'UX-001',
    description: 'We are seeking a creative and user-focused UX Designer to join our design team...',
    payRate: 90000,
    jobType: 'Contract',
    department: 'Design',
    basicQualifications: 'Bachelor\'s degree in Design, HCI, or related field...',
    desiredSkills: 'Proficiency in design tools like Figma, Sketch; experience with user research...',
    workSchedule: 'Monday-Friday, 10AM-6PM',
    physicalDemand: 'Light',
    publishedAt: '2023-05-17T11:00:00Z',
  },
]

export default function JobListingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [jobListings, setJobListings] = useState(mockJobListings)
  const router = useRouter()

  const handleNewJobPosting = () => {
    setIsDialogOpen(false)
    // In a real application, you would fetch the updated job listings here
    // For now, we'll just close the dialog
  }

  const handleRowClick = (id: string) => {
    router.push(`/job-listings/${id}`)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Posting</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] w-11/12">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new job posting.
              </DialogDescription>
            </DialogHeader>
            <JobPostingForm onSuccess={handleNewJobPosting} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Pay Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobListings.map((job) => (
            <TableRow 
              key={job.id} 
              onClick={() => handleRowClick(job.id)}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <TableCell>
                <Link 
                  href={`/job-listings/${job.id}`} 
                  className="text-inherit hover:no-underline"
                  onClick={(e) => e.stopPropagation()} // Prevent row click when clicking the link
                >
                  {job.jobTitle}
                </Link>
              </TableCell>
              <TableCell>{job.jobId}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>${job.payRate.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

