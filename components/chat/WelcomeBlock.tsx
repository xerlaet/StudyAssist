export default function WelcomeBlock() {
    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-2">
        <h3 className="text-lg font-semibold mb-2">Welcome to Study Buddy AI</h3>
        <p className="text-sm mb-4 text-gray-600">
          I’m your personal study assistant. Ask me any academic question, and I’ll provide helpful answers and resources.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'How Do I Solve Quadratic Equation',
            "Explain Newton's Law of Motion",
            'What are key Events of World War II',
          ].map((q) => (
            <button key={q} className="bg-white text-sm px-3 py-1 rounded-md border shadow">
              {q}
            </button>
          ))}
        </div>
      </div>
    );
  }
  