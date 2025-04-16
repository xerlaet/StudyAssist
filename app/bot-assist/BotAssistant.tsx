
'use client';

import { User2, LogOut } from 'lucide-react';
import ChatSidebar from '@/components/chat/ChatSideBar';
import WelcomeBlock from '@/components/chat/WelcomeBlock';
import InputBar from '@/components/chat/InputBar';
import MessageBubble from '@/components/chat/MessageBubble';
import HeaderTitle from '@/components/header-title'; // ✅ Import your dynamic title component


export default function BotAssistant() {
    return (
        <div className="flex min-h-screen w-full bg-white overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r">
          <ChatSidebar />
        </div>
  
        {/* Main Section */}
        <div className="flex-1 flex flex-col px-6 py-4">
          {/* Top Header (ONLY title now) */}
          <header className="border-b pb-3 mb-4">
            <HeaderTitle />
          </header>
  
          {/* Chat Content */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            <WelcomeBlock />
  
            <MessageBubble type="user" message="Can you explain the process of Photosynthesis?" />
  
            <MessageBubble
              type="bot"
              message="Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. It’s how plants convert light energy into chemical energy."
            />
          </div>
  
          <InputBar />
        </div>
      </div>
    );
  }
