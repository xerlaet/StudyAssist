import { BookText, Plus, Search } from 'lucide-react';

export default function ChatSidebar() {
  return (
    <aside className="w-full h-full border-r bg-white p-4 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Conversation"
          className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none"
        />
      </div>

      {/* Tabs (Topics / History) */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-1 rounded-md bg-gray-200 text-sm font-medium">
          Topics
        </button>
        <button className="flex-1 px-3 py-1 rounded-md bg-gray-100 text-sm font-medium text-gray-600">
          History
        </button>
      </div>

      {/* Recent Topics */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Recent Topics</h3>
        <ul className="space-y-2 text-sm">
          {['Photosynthesis', 'Quadratic Equation', 'World War II', 'Cellular Biology'].map((topic) => (
            <li key={topic} className="flex items-center gap-2 text-gray-800">
              <BookText className="w-4 h-4 text-gray-500" />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Questions */}
      <div>
        <h3 className="text-sm font-semibold mb-2 mt-4">Suggested Questions</h3>
        <ul className="space-y-2 text-sm">
          {[
            'How Do I solve this ?',
            'How to Fetch an API?',
            'What is Figma ?',
            'What is a Quadratic Equation?',
            'What is conditional probability?',
          ].map((question) => (
            <li key={question} className="flex items-center gap-2 text-gray-700 cursor-pointer hover:underline">
              <Plus className="w-4 h-4 text-gray-500" />
              {question}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto text-sm text-blue-600 underline cursor-pointer pt-4">
        Student Help
      </div>
    </aside>
  );
}
