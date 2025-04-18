"use client"

import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  date: string;
}

export default function RemindersPage() {
  // Load from localStorage first
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reminders");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [
      { id: 1, title: "Homework 4 Due", date: "2025-04-22" },
      { id: 2, title: "Project Proposal Submission", date: "2025-04-25" },
      { id: 3, title: "Study Session: OS Midterm", date: "2025-04-27" },
      { id: 4, title: "AI Group Meeting", date: "2025-04-29" },
      { id: 5, title: "AIM Meet", date: "2025-05-07" },
    ];
  });

  // Save to localStorage when reminders change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  }, [reminders]);

  // Handle delete
  const handleDelete = (id: number) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  // Format Date Nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Reminders</h1>

      <div className="bg-[#f9f1f1] p-6 rounded-xl max-w-3xl mx-auto">
        {/* Header with Add Reminder button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Your Reminders</h2>
          </div>
          <button
            onClick={() => alert("You can add reminder here!")}
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            ➕ Add Reminder
          </button>
        </div>

        {/* List of Reminders */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:bg-secondary/20 transition">
              <div>
                <div className="font-semibold">{reminder.title}</div>
                <div className="text-sm text-gray-500">{formatDate(reminder.date)}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-primary hover:underline text-sm">View Details</button>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
