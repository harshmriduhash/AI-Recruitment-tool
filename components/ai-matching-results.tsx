import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MatchingCategory {
  name: string
  percentage: number
}

interface Candidate {
  id: number
  name: string
  overallMatch: number
  categories: MatchingCategory[]
}

interface AIMatchingResultsProps {
  jobId: string
}

export function AIMatchingResults({ jobId }: AIMatchingResultsProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch matching results
    const fetchMatchingResults = async () => {
      setIsLoading(true)
      // In a real application, you would fetch data from your API here
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockCandidates: Candidate[] = [
        {
          id: 1,
          name: "John Doe",
          overallMatch: 85,
          categories: [
            { name: "Skills", percentage: 90 },
            { name: "Experience", percentage: 80 },
            { name: "Education", percentage: 85 },
          ]
        },
        {
          id: 2,
          name: "Jane Smith",
          overallMatch: 78,
          categories: [
            { name: "Skills", percentage: 85 },
            { name: "Experience", percentage: 70 },
            { name: "Education", percentage: 80 },
          ]
        },
        {
          id: 3,
          name: "Bob Johnson",
          overallMatch: 92,
          categories: [
            { name: "Skills", percentage: 95 },
            { name: "Experience", percentage: 90 },
            { name: "Education", percentage: 90 },
          ]
        },
      ]
      setCandidates(mockCandidates)
      setIsLoading(false)
    }

    fetchMatchingResults()
  }, [jobId])

  if (isLoading) {
    return <div className="text-center">Loading AI Matching results...</div>
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-600">AI Matching System Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-600">
                  {candidate.name} - {candidate.overallMatch}% Match
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={candidate.overallMatch} className="h-2 mb-4" />
                <div className="grid gap-4 md:grid-cols-3">
                  {candidate.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span className="font-medium">{category.percentage}%</span>
                      </div>
                      <Progress value={category.percentage} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

