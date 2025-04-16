"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "@/components/profile/overview"
import DetailedStats from "@/components/profile/detailedstats"
import Achievements from "@/components/profile/Acheivements"

export default function ProfilePage() {
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
        </TabsContent>
        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  )
}