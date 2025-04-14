export default function ChatSidebar() {
    return (
      <aside className="w-64 bg-gray-50 p-4 border-r">
        <input type="text" placeholder="Search Conversation" className="w-full px-3 py-2 border rounded mb-4" />
  
        <div className="text-xs font-semibold mb-2">Recent Topics</div>
        <ul className="text-sm mb-4">
          {['Photosynthesis', 'Quadratic Equation', 'World War II', 'Cellular Biology'].map((topic) => (
            <li key={topic} className="mb-1">{topic}</li>
          ))}
        </ul>
  
        <div className="text-xs font-semibold mb-2">Suggested Questions</div>
        <ul className="text-sm space-y-1">
          {[
            'How do I solve this?',
            'How to fetch an API?',
            'What is Figma?',
            'What is a Quadratic Equation?',
          ].map((q) => (
            <li key={q} className="text-blue-600 cursor-pointer hover:underline">+ {q}</li>
          ))}
        </ul>
  
        <div className="mt-6 text-sm text-blue-500 cursor-pointer underline">Student Help</div>
      </aside>
    );
  }
  