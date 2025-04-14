import {
    BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer,
  } from 'recharts';
  
  const barData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2 },
  ];
  
  const lineData = [
    { week: 'Week 1', progress: 40 },
    { week: 'Week 2', progress: 55 },
    { week: 'Week 3', progress: 70 },
    { week: 'Week 4', progress: 85 },
    { week: 'Week 5', progress: 90 },
  ];
  
  export default function ChartsSection() {
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
  