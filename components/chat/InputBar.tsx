import { Send } from 'lucide-react';

export default function InputBar() {
  return (
    <div className="mt-4 flex items-center border-t pt-3">
      <input
        type="text"
        placeholder="Type your question..."
        className="flex-1 px-4 py-2 border rounded-md mr-2 text-sm"
      />
      <button className="bg-black text-white p-2 rounded-md">
        <Send size={16} />
      </button>
    </div>
  );
}
