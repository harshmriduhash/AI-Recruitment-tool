'use client'

import { useState } from 'react'
import { ApplicantListView } from "@/components/applicant-list-view"
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { Button } from "@/components/ui/button"

export default function ApplicantsPage() {
  const [view, setView] = useState<'list' | 'kanban'>('list')

  return (
    <div className="min-h-screen py-6 relative">
      <AnimatedBackground />
      <main className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Manage Applicants</h1>
          <div className="space-x-4">
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              onClick={() => setView('list')}
            >
              List View
            </Button>
            <Button
              variant={view === 'kanban' ? 'default' : 'outline'}
              onClick={() => setView('kanban')}
            >
              Kanban View
            </Button>
          </div>
        </div>
        <ApplicantListView view={view} />
      </main>
    </div>
  )
}

