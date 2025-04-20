"use client"

import { useState } from "react"
import { Search, Plus, Clock, Star, Trash, ChevronLeft } from "lucide-react"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const conversations = [
    { id: "1", title: "Study plan for finals", date: "2 hours ago", starred: true },
    { id: "2", title: "Math homework help", date: "Yesterday", starred: false },
    { id: "3", title: "Research paper ideas", date: "3 days ago", starred: true },
    { id: "4", title: "Physics concepts", date: "1 week ago", starred: false },
  ]

  return (
    <div
      className={`bg-white border-r border-[#e5e2e2] transition-all duration-300 h-full ${
        collapsed ? "w-0 overflow-hidden" : "w-72"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#e5e2e2] flex justify-between items-center">
          <h2 className="font-bold">Conversations</h2>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 text-[#909090] hover:text-[#000000] transition-colors rounded-full hover:bg-[#f1f0f0]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#909090] h-4 w-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 border border-[#e5e2e2] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#23AFB6]"
            />
          </div>
        </div>

        <div className="p-4">
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-[#e3c5c3] rounded-lg font-medium hover:bg-[#d9b5b3] transition-colors">
            <Plus className="h-5 w-5" />
            New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-medium text-[#909090] uppercase">Recent</div>

          <div className="space-y-1 px-2">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="flex items-center p-2 rounded-md hover:bg-[#f1f0f0] cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium truncate">{conversation.title}</h3>
                    {conversation.starred && <Star className="h-3 w-3 text-amber-500 ml-1 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-[#909090] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {conversation.date}
                  </p>
                </div>

                <button className="p-1 text-[#909090] hover:text-red-500 transition-colors rounded-full hover:bg-[#f1f0f0]">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
