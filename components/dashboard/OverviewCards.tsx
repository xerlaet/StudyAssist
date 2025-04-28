interface CardData {
  title: string;
  value: string;
  change: string;
}

interface OverviewCardsProps {
  data: CardData[];
  placeholder?: string;
}

export default function OverviewCards({ data, placeholder }: OverviewCardsProps) {
  if (data.length === 0) {
    return <p className="text-gray-500">{placeholder || "No data available."}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {data.map((card, idx) => (
        <div key={idx} className="p-4 bg-blue-50 rounded shadow">
          <h3 className="text-sm text-gray-700">{card.title}</h3>
          <p className="text-xl font-bold">{card.value}</p>
          <p className="text-green-500 text-sm">{card.change}</p>
        </div>
      ))}
    </div>
  );
}

  
