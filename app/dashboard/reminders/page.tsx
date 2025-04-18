"use client";

import { CalendarDays, Trash2, PlusCircle } from "lucide-react";
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function deleteReminder(id: number) {
    const updated = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updated);
  }

  function addReminder() {
    if (!newTitle || !newDate) return;
    const newReminder = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
    };
    setReminders([...reminders, newReminder]);
    setShowAddModal(false);
    setNewTitle("");
    setNewDate("");
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
            onClick={() => setShowAddModal(true)}
            className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" /> Add Reminder
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

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4">
            <h3 className="text-xl font-semibold">Add New Reminder</h3>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Reminder Title"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
            />

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addReminder}
                className="px-4 py-2 rounded-md text-sm bg-black text-white hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

