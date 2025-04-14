'use client';

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import HeaderTitle from '@/components/header-title';
import OverviewCards from './OverviewCards';
import ChartsSection from './ChartsSection';
import { Button } from '@/components/ui/button';

export default function DashboardMain() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Task', value: 'task' },
    { label: 'Study Session', value: 'study-session' },
    { label: 'Study Buddies', value: 'study-buddies' },
  ];

  return (
    <div className="flex-1 bg-white px-12 py-8 max-w-6xl mx-auto">
      <HeaderTitle />
      <Separator className="my-4" />

      {/* Tab Buttons with spacing */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <Separator className="my-2" />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          <OverviewCards />
          <Separator className="my-6" />
          <ChartsSection />
        </>
      )}

      {activeTab === 'task' && (
        <div className="text-gray-600">Task content coming soon...</div>
      )}

      {activeTab === 'study-session' && (
        <div className="text-gray-600">Study Session content coming soon...</div>
      )}

      {activeTab === 'study-buddies' && (
        <div className="text-gray-600">Study Buddies content coming soon...</div>
      )}
    </div>
  );
}
