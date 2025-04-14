'use client';
import ChatSidebar from '@/components/chat/ChatSidebar';
import WelcomeBlock from '@/components/chat/WelcomeBlock';
import InputBar from '@/components/chat/InputBar';
import MessageBubble from '@/components/chat/MessageBubble';

export default function BotAssistant() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />

      <div className="flex-1 flex flex-col bg-white px-6 py-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">🤖 Bot Assist</h2>
          <div className="text-sm text-gray-500">Example User</div>
        </header>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          <WelcomeBlock />
          <MessageBubble type="user" message="Can you explain the process of Photosynthesis?" />
          <MessageBubble type="bot" message="Photosynthesis is the process by which green plants..." />
        </div>

        <InputBar />
      </div>
    </div>
  );
}
