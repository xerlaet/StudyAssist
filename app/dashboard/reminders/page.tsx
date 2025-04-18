"use client";

import { useState } from "react";
import { CalendarDays, Trash2 } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  date: string; // Stored as YYYY-MM-DD
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Homework 4 Due", date: "2025-04-22" },
    { id: 2, title: "Project Proposal Submission", date: "2025-04-25" },
    { id: 3, title: "Study Session: OS Midterm", date: "2025-04-27" },
    { id: 4, title: "AI Group Meeting", date: "2025-04-29" },
    { id: 5, title: "AIM Meet", date: "2025-05-07" },
  ]);

  const handleDelete = (id: number) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const handleAddReminder = () => {
    alert("➕ You can add a reminder here in future!");
  };

  return (
    <main className="min-h-screen px-8 py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Reminders</h1>

      <section className="bg-[#f9f1f1] p-8 rounded-xl mx-auto max-w-3xl">
        {/* Header with Add Reminder Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Your Reminders</h2>
          </div>
          <button
            onClick={handleAddReminder}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
          >
            ➕ Add Reminder
          </button>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-md font-semibold">{reminder.title}</h3>
                <p className="text-gray-500 text-sm">{formatDate(reminder.date)}</p>
              </div>
              <div className="flex gap-3">
                <button className="text-primary hover:underline text-sm">View Details</button>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete Reminder"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

