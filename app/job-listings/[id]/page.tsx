'use client'

import { useState, useEffect } from 'react'
import { useRouter, notFound } from 'next/navigation'
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
import { updateJobPosting } from '@/server/job-posting-actions'
import { AIMatchingResults } from '@/components/ai-matching-results'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { LoadingDialog } from '@/components/LoadingDialog'

const mockJobListings = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    jobId: 'SE-001',
    department: 'Engineering',
    description: 'We are seeking a talented Software Engineer to join our team...',
    payRate: 100000,
    jobType: 'Full-time',
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
    department: 'Product',
    description: 'We are looking for an experienced Product Manager to lead our product development efforts...',
    payRate: 110000,
    jobType: 'Full-time',
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
    department: 'Design',
    description: 'We are seeking a creative and user-focused UX Designer to join our design team...',
    payRate: 90000,
    jobType: 'Contract',
    basicQualifications: 'Bachelor\'s degree in Design, HCI, or related field...',
    desiredSkills: 'Proficiency in design tools like Figma, Sketch; experience with user research...',
    workSchedule: 'Monday-Friday, 10AM-6PM',
    physicalDemand: 'Light',
    publishedAt: '2023-05-17T11:00:00Z',
  },
]

const fetchJobDetails = async (id: string) => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
  const job = mockJobListings.find(job => job.id === id)
  if (!job) {
    throw new Error('Job not found')
  }
  return job
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchJobDetails(params.id)
      .then(fetchedJob => {
        setJob(fetchedJob)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch job details:', error)
        setIsLoading(false)
        notFound()
      })
  }, [params.id])

  const handleEditSuccess = async (updatedJob: any) => {
    await updateJobPosting(params.id, updatedJob);
    setJob(updatedJob)
    setIsEditDialogOpen(false)
  }

  if (isLoading) {
    return <LoadingDialog />
  }

  if (!job) {
    return notFound()
  }

  return (
    <div className="min-h-screen py-10 relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 relative z-10">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          Back to Listings
        </Button>
        <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-blue-600">{job.jobTitle}</h1>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button>Edit Job</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] w-11/12">
                <DialogHeader>
                  <DialogTitle>Edit Job Posting</DialogTitle>
                  <DialogDescription>
                    Make changes to the job posting below.
                  </DialogDescription>
                </DialogHeader>
                <JobPostingForm initialData={job} onSuccess={handleEditSuccess} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Job ID: {job.jobId}</p>
              <p className="text-sm text-gray-500">Department: {job.department}</p>
              <p className="text-sm text-gray-500">Published: {new Date(job.publishedAt).toLocaleDateString()}</p>
              <p className="mt-4"><strong>Pay Rate:</strong> ${job.payRate.toLocaleString()} per year</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Work Schedule:</strong> {job.workSchedule}</p>
              <p><strong>Physical Demand:</strong> {job.physicalDemand}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Basic Qualifications</h2>
            <p className="text-gray-700">{job.basicQualifications}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Desired Skills</h2>
            <p className="text-gray-700">{job.desiredSkills}</p>
          </div>
        </div>
        
        <AIMatchingResults jobId={params.id} />
      </div>
    </div>
  )
}

