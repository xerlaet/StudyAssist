export default function MessageBubble({ type, message }: { type: 'user' | 'bot'; message: string }) {
    const baseStyle = "max-w-lg px-4 py-2 rounded-xl shadow text-sm";
    return (
      <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`${baseStyle} ${type === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          {message}
        </div>
      </div>
    );
  }
  