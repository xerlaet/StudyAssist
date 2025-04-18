"use client";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Reminder {
  id: number;
  title: string;
  date: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Homework 4 Due", date: "April 22, 2025" },
    { id: 2, title: "Project Proposal Submission", date: "April 25, 2025" },
    { id: 3, title: "Study Session: OS Midterm", date: "April 27, 2025" },
    { id: 4, title: "AI Group Meeting", date: "April 29, 2025" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setNewTitle("");
    setNewDate("");
  }

  function addReminder() {
    if (!newTitle || !newDate) {
      alert("Please fill in both title and date.");
      return;
    }

    const formattedDate = new Date(newDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newReminder = {
      id: Date.now(),
      title: newTitle,
      date: formattedDate,
    };
    setReminders([...reminders, newReminder]);
    closeModal();
  }

  function deleteReminder(id: number) {
    setReminders(reminders.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Reminders</h1>

      <div className="bg-[#f9f1f1] p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Your Reminders</h2>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm"
          >
            <Plus className="h-4 w-4" />
            Add Reminder
          </button>
        </div>

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold">{reminder.title}</h3>
                <p className="text-sm text-gray-500">{reminder.date}</p>
              </div>
              <div className="flex gap-4">
                <button className="text-primary text-sm hover:underline">
                  View Details
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <Dialog.Title className="text-lg font-bold mb-4">Add New Reminder</Dialog.Title>

              <div className="space-y-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full border px-4 py-2 rounded-md text-sm"
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md text-sm"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={addReminder}
                  className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                >
                  Save Reminder
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
