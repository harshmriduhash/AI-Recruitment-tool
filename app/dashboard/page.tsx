'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { LoadingDialog } from '@/components/LoadingDialog'
import { AIChat } from '@/components/AIChat'
import { PreviewApproval } from '@/components/PreviewApproval'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isSignedIn') === 'true'
    if (!isAuthenticated) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <LoadingDialog />
  }

  return (
    <>
      <AnimatedBackground />
      <div className="container mx-auto py-10 relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to Your Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600">Job Listings</CardTitle>
              <CardDescription>Manage your job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/job-listings')} className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white">View Listings</Button>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-600">Applicants</CardTitle>
              <CardDescription>Review job applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/applicants')} className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white">View Applicants</Button>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-teal-600">Analytics</CardTitle>
              <CardDescription>View hiring insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => alert('Analytics feature coming soon!')} className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white">View Analytics</Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <AIChat />
          <PreviewApproval />
        </div>
      </div>
    </>
  )
}

