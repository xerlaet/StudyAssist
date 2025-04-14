'use client';

import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';

export default function InputBar() {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log('Sending message:', input); // Replace with actual logic
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 border-t pt-4">
    <input
      type="text"
      className="flex-grow px-5 py-3 rounded-md border text-sm outline-none"
      placeholder="Hey there, I’m EduBot—your AI-powered academic sidekick! What are we tackling today?"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button type="submit" className="bg-black text-white p-3 rounded-md">
      <SendHorizonal size={16} />
    </button>
  </form>
  
  );
}
