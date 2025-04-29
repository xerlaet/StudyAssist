"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "@/components/profile/overview"
import DetailedStats from "@/components/profile/detailedstats"
import Achievements from "@/components/profile/Achievements"
import { useEffect, useState } from "react"

interface Quiz {
  quiz_id: number
  email: number
  score: number
}

export default function ProfilePage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [average, setAverage] = useState<number>(0)
  const hardcodedUserId = 9

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/quizzes/`)
        const data: Quiz[] = await res.json()
        const myQuizzes = data.filter(q => q.email === hardcodedUserId)
        setQuizzes(myQuizzes)

        if (myQuizzes.length > 0) {
          const avg = myQuizzes.reduce((sum, q) => sum + q.score, 0) / myQuizzes.length
          setAverage(avg)
        } else {
          setAverage(0)
        }
      } catch (error) {
        console.error("Failed to fetch quizzes", error)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="px-6 py-4 w-full">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="detailed">
          <DetailedStats />
          {/* <div className="mt-6 p-4 bg-white border rounded shadow space-y-2">
            <h2 className="text-lg font-semibold">Quiz Scores for User #{hardcodedUserId}</h2>
            {quizzes.length > 0 ? (
              <>
                <p className="text-sm">Average Score: <strong>{average.toFixed(2)}</strong></p>
                <ul className="space-y-1">
                  {quizzes.map((q, idx) => (
                    <li key={q.quiz_id} className="text-sm">
                      Quiz {idx + 1}: <strong>{q.score}</strong>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">No quizzes found for this user.</p>
            )}
          </div> */}
        </TabsContent>
        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  )
}
