// components/profile/Achievements.tsx
"use client"
import * as React from "react"
import { Award, Clock, PenTool, CheckCircle2, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Achievements() {
  return (
    <div className="space-y-6">
      {/* Recent Achievements */}
      <div className="bg-[#f9f1f1] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Recent Achievements</h2>
        <div className="space-y-4">
          <AchievementCard
            title="Perfect Score!"
            description="You scored 100% on your Computer Science quiz"
            date="2 days ago"
            icon={<Award className="h-6 w-6 text-yellow-500" />}
          />
          <AchievementCard
            title="Study Milestone"
            description="You've studied for over 50 hours total"
            date="1 week ago"
            icon={<Clock className="h-6 w-6 text-[#23b0ba]" />}
          />
          <AchievementCard
            title="Note Taking Pro"
            description="You've created 25+ study notes"
            date="2 weeks ago"
            icon={<PenTool className="h-6 w-6 text-purple-500" />}
          />
        </div>
      </div>

      {/* Progress Milestones */}
      <div className="bg-[#f9f1f1] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Progress Milestones</h2>
        <div className="space-y-6 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <MilestoneCard
            title="Complete 20 Quizzes"
            progress={70}
            current={14}
            target={20}
            icon={<CheckCircle2 className="h-5 w-5 text-[#23b0ba]" />}
          />
          <MilestoneCard
            title="Achieve 90% Average Score"
            progress={94}
            current={85}
            target={90}
            suffix="%"
            icon={<TrendingUp className="h-5 w-5 text-[#23b0ba]" />}
          />
          <MilestoneCard
            title="Study 100 Hours Total"
            progress={52}
            current={52}
            target={100}
            suffix=" hrs"
            icon={<Clock className="h-5 w-5 text-[#23b0ba]" />}
          />
        </div>
      </div>
    </div>
  )
}

type AchievementCardProps = {
    title: string
    description: string
    date: string
    icon: React.ReactNode
  }
  
  function AchievementCard({ title, description, date, icon }: AchievementCardProps) {
    return (
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
    )
  }
  
  type MilestoneCardProps = {
    title: string
    progress: number
    current: number
    target: number
    suffix?: string
    icon: React.ReactNode
  }
  
  function MilestoneCard({
    title,
    progress,
    current,
    target,
    suffix = "",
    icon,
  }: MilestoneCardProps) {
    return (
      <div className="relative pl-10">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-2 border-[#23b0ba] flex items-center justify-center z-10">
          {icon}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold mb-2">{title}</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>
              {current}
              {suffix} / {target}
              {suffix}
            </span>
          </div>
          {/* Progress component should go here */}
        </div>
      </div>
    )
  }
