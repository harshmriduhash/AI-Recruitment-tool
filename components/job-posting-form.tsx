'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJobPosting, updateJobPosting } from '@/server/job-posting-actions'
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  jobId: z.string().min(2, {
    message: "Job ID must be at least 2 characters.",
  }),
  description: z.string().optional(),
  payRate: z.number().positive({
    message: "Pay rate must be a positive number.",
  }),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Temporary"]),
  basicQualifications: z.string().min(10, {
    message: "Basic qualifications must be at least 10 characters.",
  }),
  desiredSkills: z.string().min(10, {
    message: "Desired skills must be at least 10 characters.",
  }),
  workSchedule: z.string().min(2, {
    message: "Work schedule must be at least 2 characters.",
  }),
  physicalDemand: z.enum(["Light", "Moderate", "Heavy"]),
})

export function JobPostingForm({ onSuccess, initialData }: { onSuccess?: (job: any) => void, initialData?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      jobTitle: "",
      jobId: "",
      description: "",
      payRate: 0,
      jobType: "Full-time",
      basicQualifications: "",
      desiredSkills: "",
      workSchedule: "",
      physicalDemand: "Light",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = initialData
        ? await updateJobPosting(initialData.id, values)
        : await createJobPosting(values)
      console.log('Job posting submission result:', result)
      toast({
        title: initialData ? "Job Posting Updated" : "Job Posting Created",
        description: `Job "${result.jobTitle}" has been successfully ${initialData ? 'updated' : 'created'}.`,
      })
      if (onSuccess) {
        onSuccess(result)
      }
      if (!initialData) {
        form.reset()
      }
    } catch (error) {
      console.error('Failed to submit job posting:', error)
      let errorMessage = 'An unexpected error occurred. Please try again.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'create'} job posting: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job ID</FormLabel>
                  <FormControl>
                    <Input placeholder="SE-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay Rate (Annual)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Schedule</FormLabel>
                  <FormControl>
                    <Input placeholder="Monday-Friday, 9AM-5PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the job role and responsibilities..." {...field} className="h-32 w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="basicQualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Basic Qualifications</FormLabel>
                  <FormControl>
                    <Textarea placeholder="List the basic qualifications required for this position..." {...field} className="h-32 w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Skills</FormLabel>
                  <FormControl>
                    <Textarea placeholder="List any additional skills that would be beneficial for this role..." {...field} className="h-32 w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="physicalDemand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physical Demand</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select physical demand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto md:px-12">
          {isSubmitting ? 'Submitting...' : initialData ? 'Update Job Posting' : 'Create Job Posting'}
        </Button>
      </form>
    </Form>
  )
}

