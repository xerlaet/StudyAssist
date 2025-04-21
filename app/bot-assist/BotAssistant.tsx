'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/chat/ChatSideBar';
import WelcomeBlock from '@/components/chat/WelcomeBlock';
import InputBar from '@/components/chat/InputBar';
import MessageBubble from '@/components/chat/MessageBubble';
import HeaderTitle from '@/components/header-title';

export default function BotAssistant() {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', message: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Backend Response Text:", data.response);
        setMessages((prev) => [...prev, { type: 'bot', message: data.response }]);  // ✅ Directly use
      } else {
        setMessages((prev) => [...prev, { type: 'bot', message: `Error: ${data.error}` }]);
      }
    } catch (error) {
      console.error("Server error:", error);
      setMessages((prev) => [...prev, { type: 'bot', message: 'Server error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <ChatSidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col px-6 py-4">
        <header className="border-b pb-3 mb-4">
          <HeaderTitle />
        </header>

        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          <WelcomeBlock onSendMessage={handleSendMessage} />

          {messages.map((msg, index) => (
            <MessageBubble key={index} type={msg.type} message={msg.message} />
          ))}

          {loading && (
            <MessageBubble type="bot" message="Typing..." />
          )}
        </div>

        <div className="mt-6">
          <InputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}


