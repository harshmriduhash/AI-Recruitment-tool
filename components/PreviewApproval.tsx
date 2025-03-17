'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PreviewApproval() {
  const [content, setContent] = useState('')
  const [isApproved, setIsApproved] = useState(false)

  const handleApprove = () => {
    setIsApproved(true)
    // Here you would typically send the approved content to your backend
    console.log('Content approved:', content)
  }

  const handleEdit = () => {
    setIsApproved(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Preview and Approval</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="AI generated content will appear here for review..."
          className="min-h-[200px] mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleEdit} disabled={!isApproved}>
            Edit
          </Button>
          <Button onClick={handleApprove} disabled={isApproved}>
            Approve
          </Button>
        </div>
        {isApproved && (
          <p className="mt-2 text-sm text-green-600">Content has been approved!</p>
        )}
      </CardContent>
    </Card>
  )
}

