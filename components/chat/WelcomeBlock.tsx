"use client"

import { Bot, Lightbulb, BookOpen, HelpCircle } from "lucide-react"

interface WelcomeBlockProps {
  onSendMessage: (message: string) => void
}

export default function WelcomeBlock({ onSendMessage }: WelcomeBlockProps) {
  const suggestions = [
    "Create a study plan for my finals",
    "Explain the concept of photosynthesis",
    "Help me solve this math problem",
    "Summarize this research paper",
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="h-16 w-16 rounded-full bg-[#e3c5c3] flex items-center justify-center mb-4">
        <Bot className="h-8 w-8 text-[#23AFB6]" />
      </div>

      <h1 className="text-2xl font-bold mb-2">StudyBuddy AI Assistant</h1>

      <p className="text-[#7f7b7b] text-center max-w-md mb-8">
        I'm here to help with your studies, answer questions, create study plans, and more. What can I help you with
        today?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSendMessage(suggestion)}
            className="flex items-start gap-3 p-4 border border-[#e5e2e2] rounded-lg hover:bg-[#f1f0f0] transition-colors text-left"
          >
            {index === 0 && <Lightbulb className="h-5 w-5 text-[#23AFB6] flex-shrink-0" />}
            {index === 1 && <BookOpen className="h-5 w-5 text-[#23AFB6] flex-shrink-0" />}
            {index === 2 && <HelpCircle className="h-5 w-5 text-[#23AFB6] flex-shrink-0" />}
            {index === 3 && <Bot className="h-5 w-5 text-[#23AFB6] flex-shrink-0" />}
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
