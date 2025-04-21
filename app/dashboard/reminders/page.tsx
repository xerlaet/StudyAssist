"use client";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Reminder {
  reminder_id: number;
  event: string;
  reminder_time: string;
  message: string;
  email: number;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const accessToken = typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;

  const currentUser = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("currentUser") || "{}")
    : {};
  const ACCOUNT_ID = currentUser.account_id;

  useEffect(() => {
    if (!ACCOUNT_ID) return;

    fetch("http://localhost:8000/api/reminders/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setReminders(data.filter((r: Reminder) => r.email === ACCOUNT_ID))
      )
      .catch((err) => console.error("Failed to fetch reminders:", err));
  }, [ACCOUNT_ID]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setNewTitle("");
    setNewDate("");
    setNewDescription("");
  }

  async function addReminder() {
    if (!newTitle.trim()) {
      alert("Error: Title Required");
      return;
    }

    const parsedDate = new Date(newDate);
    if (isNaN(parsedDate.getTime())) {
      alert("Error: Date should be in proper format");
      return;
    }

    const now = new Date();
    if (parsedDate < now) {
      alert("Error: Cannot schedule reminder in the past");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/reminders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: ACCOUNT_ID,
          event: newTitle,
          reminder_time: newDate,
          message: newDescription || "You have an upcoming event!",
        }),
      });

      if (!res.ok) throw new Error("Failed to create reminder");

      const created = await res.json();
      setReminders([...reminders, created]);
      closeModal();
    } catch (err) {
      console.error("Failed to add reminder:", err);
      alert("Could not save reminder.");
    }
  }

  async function deleteReminder(id: number) {
    try {
      await fetch(`http://localhost:8000/api/reminders/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setReminders(reminders.filter((r) => r.reminder_id !== id));
    } catch (err) {
      console.error("Failed to delete reminder:", err);
    }
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
              key={reminder.reminder_id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold">{reminder.event}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(reminder.reminder_time).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 italic">{reminder.message}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => deleteReminder(reminder.reminder_id)}
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
                  type="datetime-local"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md text-sm"
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter description (optional)"
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
