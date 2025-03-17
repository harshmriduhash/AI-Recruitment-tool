'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { NewApplicantModal } from "@/components/new-applicant-modal"

type ApplicantStatus = 'New' | 'Interviewing' | 'Reviewed'

interface Applicant {
  id: number
  name: string
  email: string
  position: string
  status: ApplicantStatus
  resume?: File
}

interface ApplicantListViewProps {
  view: 'list' | 'kanban'
}

export function ApplicantListView({ view }: ApplicantListViewProps) {
  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 1, name: "John Smith", email: "john@example.com", position: "Software Engineer", status: "New" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", position: "Product Manager", status: "Interviewing" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", position: "UX Designer", status: "Reviewed" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", position: "Data Analyst", status: "New" },
  ])

  const getStatusColor = (status: ApplicantStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800'
      case 'Interviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Reviewed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddApplicant = (newApplicant: Omit<Applicant, 'id'>) => {
    setApplicants(prev => [...prev, { ...newApplicant, id: prev.length + 1 }])
  }

  return (
    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-blue-600">Applicant Tracking</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track applicants for your job postings
          </p>
        </div>
        <NewApplicantModal onAddApplicant={handleAddApplicant} />
      </CardHeader>
      <CardContent>
        {view === 'list' ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id} className="hover:bg-blue-50 cursor-pointer">
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['New', 'Interviewing', 'Reviewed'] as ApplicantStatus[]).map((status) => (
              <div key={status} className="space-y-4">
                <h3 className="font-semibold text-lg text-blue-600">{status}</h3>
                {applicants
                  .filter((applicant) => applicant.status === status)
                  .map((applicant) => (
                    <Card key={applicant.id} className="hover:bg-blue-50 cursor-pointer">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{applicant.name}</h4>
                        <p className="text-sm text-gray-500">{applicant.email}</p>
                        <p className="text-sm text-gray-500">{applicant.position}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

