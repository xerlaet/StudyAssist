
"use client"

import { Progress } from "@/components/ui/progress"

export default function DetailedStats() {
  const studyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.0 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.2 },
  ]

  const maxHours = Math.max(...studyData.map((d) => d.hours))

  return (
    <div className="space-y-6">
      {/* Weekly Study Hours */}
       <div className="bg-[#f9f1f1] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Weekly Study Hours</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {studyData.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full bg-primary rounded-t-md relative group"
                style={{ height: `${(day.hours / maxHours) * 100}%` }}
              > {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.hours} hrs
                </div>
              </div>
              <span className="text-xs font-medium">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Streak + Subject Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Streak */}
        <div className="bg-[#f9f1f1] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Study Streak</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <div>
              <p className="font-semibold">Current Streak</p>
              <p className="text-sm text-gray-500">Keep it up!</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div
                key={i}
                className={`h-8 rounded flex items-center justify-center text-xs font-semibold ${
                  i < 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Subject Focus */}
        <div className="bg-[#f9f1f1] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Subject Focus</h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", value: 40 },
              { subject: "Computer Science", value: 30 },
              { subject: "Physics", value: 20 },
              { subject: "English", value: 10 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.subject}</span>
                  <span>{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

