'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Upload } from 'lucide-react'

interface NewApplicantModalProps {
  onAddApplicant: (applicant: any) => void
}

export function NewApplicantModal({ onAddApplicant }: NewApplicantModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState<'New' | 'Interviewing' | 'Reviewed'>('New')
  const [resume, setResume] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddApplicant({ name, email, position, status, resume })
    // Reset form
    setName('')
    setEmail('')
    setPosition('')
    setStatus('New')
    setResume(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Here you would typically send the file to your backend for parsing
      // For this example, we'll simulate parsing with a timeout
      setResume(file)
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Simulated parsed data
      setName('John Doe')
      setEmail('john.doe@example.com')
      setPosition('Software Engineer')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Applicant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Applicant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload">Upload Resume (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Input id="upload" type="file" className="hidden" onChange={handleFileUpload} />
              <Button type="button" variant="outline" onClick={() => document.getElementById('upload')?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
              {resume && <span className="text-sm text-gray-500">{resume.name}</span>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: 'New' | 'Interviewing' | 'Reviewed') => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Add Applicant</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

