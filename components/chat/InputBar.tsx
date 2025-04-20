"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mic, Paperclip } from "lucide-react"

interface InputBarProps {
  onSendMessage: (message: string) => void
}

export default function InputBar({ onSendMessage }: InputBarProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className="border-t border-[#e5e2e2] bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 text-[#909090] hover:text-[#000000] transition-colors rounded-full hover:bg-[#f1f0f0]"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
          />
        </div>

        <button
          type="button"
          className="p-2 text-[#909090] hover:text-[#000000] transition-colors rounded-full hover:bg-[#f1f0f0]"
        >
          <Mic className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className="p-2 bg-[#e3c5c3] text-[#000000] rounded-full hover:bg-[#d9b5b3] transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}
