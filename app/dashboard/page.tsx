import React from 'react';
import DashboardMain from '@/components/dashboard/DashboardMain';
import ReminderIcon from '@/components/dashboard/ReminderIcon';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar with Reminder Icon */}
      <div className="flex justify-end items-center p-4 border-b border-gray-200">
        <ReminderIcon />
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto">
        <DashboardMain />
      </div>
    </div>
  );
}
