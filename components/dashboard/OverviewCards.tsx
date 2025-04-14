export default function OverviewCards() {
    const cards = [
      { title: "Total Study Hours", value: "18.7 hrs", change: "+2.5 hrs from last week" },
      { title: "Completed Task", value: "12/15", change: "80% Completion Rate" },
      { title: "Total Study Hours", value: "18.7 hrs", change: "+2.5 hrs from last week" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="p-4 bg-blue-50 rounded shadow">
            <h3 className="text-sm text-gray-700">{card.title}</h3>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-green-500 text-sm">{card.change}</p>
          </div>
        ))}
      </div>
    );
  }
  