"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ReminderIcon() {
  const [showReminder, setShowReminder] = useState(false);

  return (
    <div className="relative">
      {/* Reminder Button */}
      <button onClick={() => setShowReminder(!showReminder)}>
        <Bell className="h-6 w-6 text-gray-700 hover:text-black transition" />
      </button>

      {/* Reminder Popup */}
      {showReminder && (
        <div className="absolute right-0 top-10 bg-[#f9f1f1] p-4 rounded-xl shadow-lg w-80 z-50">
          <h3 className="font-semibold mb-3 text-lg">Upcoming Tasks</h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Submit OS HW</span>
              <span className="text-gray-500">Today, 8 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Team Meeting</span>
              <span className="text-gray-500">Tomorrow, 2 PM</span>
            </li>
          </ul>

          {/* View All Reminders Button */}
          <Link href="/dashboard/reminders" className="block">
            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition text-sm"
              onClick={() => setShowReminder(false)}  // Close popup when clicking
            >
              View All Reminders
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
