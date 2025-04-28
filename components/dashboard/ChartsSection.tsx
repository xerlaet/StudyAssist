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


interface ChartsSectionProps {
  data: { [key: string]: any }[];
}


export default function ChartsSection({ data }: ChartsSectionProps) {
  // Transform Firestore data if needed
  const barData = data.map(item => ({
    day: item.day || 'N/A',
    hours: item.hours || 0,
  }));

  const lineData = data.map(item => ({
    week: item.week || 'N/A',
    progress: item.progress || 0,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-pink-50 p-4 rounded shadow">
        <h4 className="text-sm mb-2">Study Time (Daily)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-pink-50 p-4 rounded shadow">
        <h4 className="text-sm mb-2">Weekly Progress</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="progress" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
