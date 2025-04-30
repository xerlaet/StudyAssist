"use client";

import { Progress } from "@/components/ui/progress";

export default function DetailedStats() {
  const studyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.0 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.2 },
  ];

  const maxHours = Math.max(...studyData.map((d) => d.hours));

  return (
    <div className="space-y-6">
      {/* Weekly Study Hours */}
      <div className="bg-[#f9f1f1] dark:bg-[#1e1e1e] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6 dark:text-white">Weekly Study Hours</h2>
        <div className="h-64 flex items-end justify-between gap-2 px-2">
          {studyData.map((day, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative group h-full">
              {/* Bar */}
              <div className="flex-1 flex items-end w-full relative">
                <div
                  className="w-full bg-[#2dd4bf] dark:bg-[#3a86ff] rounded-t-md transition-all duration-300"
                  style={{
                    height: `${(day.hours / maxHours) * 100}%`,
                    minHeight: "8px", // Make bars more visible
                  }}
                />
                {/* Tooltip */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {day.hours} hrs
                </div>
              </div>
              <span className="text-xs font-medium mt-2 dark:text-gray-300">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Streak + Subject Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Streak */}
        <div className="bg-[#f9f1f1] dark:bg-[#1e1e1e] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Study Streak</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary dark:bg-[#3a86ff] text-white rounded-full flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <div>
              <p className="font-semibold dark:text-white">Current Streak</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Keep it up!</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div
                key={i}
                className={`h-8 rounded flex items-center justify-center text-xs font-semibold ${
                  i < 4
                    ? "bg-primary dark:bg-[#3a86ff] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Subject Focus */}
        <div className="bg-[#f9f1f1] dark:bg-[#1e1e1e] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Subject Focus</h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", value: 40 },
              { subject: "Computer Science", value: 30 },
              { subject: "Physics", value: 20 },
              { subject: "English", value: 10 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
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
  );
}
