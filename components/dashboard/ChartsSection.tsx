'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

import { DayGraphPoint, WeekGraphPoint } from './DashboardMain'; // adjust path if needed

interface ChartsSectionProps {
  dayData: DayGraphPoint[];
  weekData: WeekGraphPoint[];
}

export default function ChartsSection({ dayData, weekData }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart: Daily Study Time */}
      <div className="bg-pink-50 p-4 rounded shadow">
        <h4 className="text-sm mb-2">Study Time (Daily)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dayData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Weekly Progress */}
      <div className="bg-pink-50 p-4 rounded shadow">
        <h4 className="text-sm mb-2">Weekly Progress</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weekData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="totalHours" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
