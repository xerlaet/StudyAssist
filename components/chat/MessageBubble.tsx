import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // ✅ GitHub Flavored Markdown

export default function MessageBubble({ type, message }: { type: 'user' | 'bot' | 'intro'; message: string }) {
  const baseStyles = "max-w-lg px-4 py-2 rounded-xl text-sm";
  const bubbleStyles =
    type === 'user'
      ? "bg-black text-white self-end"
      : type === 'bot'
      ? "bg-gray-200 text-gray-800 flex gap-2 items-start"
      : "border border-blue-400 text-gray-800 bg-white";

  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
      {type === 'bot' && (
        <div className="w-3 h-3 rounded-full bg-gray-300 mt-2 mr-2" />
      )}
      <div className={`${baseStyles} ${bubbleStyles}`}>
        {/* ✅ Add remarkGfm plugin for better parsing */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
      </div>
    </div>
  );
}

