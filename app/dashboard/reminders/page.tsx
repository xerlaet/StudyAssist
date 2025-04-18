"use client";

import { CalendarDays, Trash2 } from "lucide-react";
import { useState } from "react";

type Reminder = {
  id: number;
  title: string;
  date: string;
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Homework 4 Due", date: "2025-04-22" },
    { id: 2, title: "Project Proposal Submission", date: "2025-04-25" },
    { id: 3, title: "Study Session: OS Midterm", date: "2025-04-27" },
    { id: 4, title: "AI Group Meeting", date: "2025-04-29" },
    { id: 5, title: "AIM Meet", date: "2025-05-07" },
  ]);

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function deleteReminder(id: number) {
    const updated = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updated);
  }

  return (
    <div className="min-h-screen px-12 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Reminders</h1>

      <div className="bg-[#f9f1f1] p-8 rounded-3xl max-w-4xl mx-auto">
        {/* Header with Add Option */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarDays className="h-7 w-7" />
            Your Reminders
          </h2>
          <button
            className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
            onClick={() => alert("You can add new reminder here (future feature).")}
          >
            + Add Reminder
          </button>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-secondary/20 transition"
            >
              <div>
                <h3 className="font-semibold">{reminder.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(reminder.date)}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => alert(`Viewing details for "${reminder.title}"`)}
                >
                  View Details
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  title="Delete Reminder"
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
