"use client";

export default function ChatMessage({ message }) {
  const parseContent = (content) => {
    const parts = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.substring(lastIndex, match.index),
        });
      }
      parts.push({
        type: "link",
        text: match[1],
        url: match[2],
        isPortfolio: match[2].includes("portfolio-gamma-ten-75.vercel.app"),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: "text", content: content.substring(lastIndex) });
    }

    return parts;
  };

  const parts = parseContent(message.content);

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-[80%] ${
          message.role === "user" ? "bg-blue-100" : "bg-white border"
        }`}
      >
        {parts.map((part, index) =>
          part.type === "text" ? (
            <span key={index}>{part.content}</span>
          ) : (
            <a
              key={index}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-2 py-1 rounded-md text-sm ml-1 ${
                part.isPortfolio
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "text-blue-600 underline"
              }`}
            >
              {part.text}
            </a>
          )
        )}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
