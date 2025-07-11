"use client";
import { useState, useRef, useEffect } from "react";
import {
  SendHorizonal,
  Bot,
  Paperclip, // Kept for file upload
  Image, // Kept for file upload
  User,
} from "lucide-react";

// This component will be the actual content inside the floating chatbox
export default function AIChatboxContent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // Retained file upload state
  const [chatHistory, setChatHistory] = useState([]); // Retained chat history state
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null); // Retained file input ref

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
        // When chatbox opens, load the last conversation
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(
          parsedHistory.filter((msg) => msg.conversationId === "current")
        ); // Assuming a way to filter current conversation
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  // Adjusted to save only current conversation, if you want full history management like sidebar,
  // it needs more robust ID/conversation management
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        "chatHistory",
        JSON.stringify(
          messages.map((msg) => ({ ...msg, conversationId: "current" }))
        )
      );
    } else {
      localStorage.removeItem("chatHistory"); // Clear history if messages are empty
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus the input when the component mounts (chatbox opens)
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const parseMessageContent = (content) => {
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
      parts.push({
        type: "text",
        content: content.substring(lastIndex),
      });
    }

    return parts
      .map((part) => {
        if (part.type !== "text") return part;

        const listItems = [];
        let currentContent = "";
        const lines = part.content.split("\n");

        lines.forEach((line, i) => {
          const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
          const bulletedMatch = line.match(/^([*-])\s+(.*)/);

          if (numberedMatch) {
            if (currentContent) {
              listItems.push({ type: "text", content: currentContent });
              currentContent = "";
            }
            listItems.push({
              type: "numbered-item",
              number: numberedMatch[1],
              content: numberedMatch[2],
            });
          } else if (bulletedMatch) {
            if (currentContent) {
              listItems.push({ type: "text", content: currentContent });
              currentContent = "";
            }
            listItems.push({
              type: "bulleted-item",
              bullet: bulletedMatch[1],
              content: bulletedMatch[2],
            });
          } else {
            currentContent += (i > 0 ? "\n" : "") + line;
          }
        });

        if (currentContent) {
          listItems.push({ type: "text", content: currentContent });
        }

        return listItems.length > 1 ? listItems : part;
      })
      .flat();
  };

  const renderMessageContent = (content) => {
    const cleanContent = content.replace(/\*\*/g, "");
    const parts = parseMessageContent(cleanContent);
    let currentList = null;
    const result = [];

    const closeCurrentList = () => {
      if (currentList) {
        result.push(
          currentList.type === "numbered" ? (
            <ol
              key={`list-${result.length}`}
              className="list-decimal pl-5 my-2 space-y-1"
            >
              {currentList.items}
            </ol>
          ) : (
            <ul
              key={`list-${result.length}`}
              className="list-disc pl-5 my-2 space-y-1"
            >
              {currentList.items}
            </ul>
          )
        );
        currentList = null;
      }
    };

    const isHeading = (text) => {
      return (
        /^(#+\s+|\d+\.\s+)/.test(text) ||
        (text.trim().length > 0 && text === text.toUpperCase())
      );
    };

    parts.forEach((part, index) => {
      if (part.type === "text") {
        closeCurrentList();

        const lines = part.content.split("\n");

        lines.forEach((line, lineIndex) => {
          if (isHeading(line)) {
            const headingText = line.replace(/^(#+\s+|\d+\.\s+)/, "").trim();
            if (headingText) {
              result.push(
                <h3
                  key={`heading-${index}-${lineIndex}`}
                  className="text-md font-semibold text-blue-700 mt-2 mb-1" // Adjusted size
                >
                  {headingText}
                </h3>
              );
            }
          } else if (line.trim()) {
            result.push(
              <span key={`text-${index}-${lineIndex}`} className="text-sm">
                {" "}
                {/* Adjusted size */}
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </span>
            );
          }
        });
      } else if (part.type === "link") {
        closeCurrentList();
        result.push(
          <a
            key={`link-${index}`}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ml-1 ${
              // Adjusted size
              part.isPortfolio
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "text-blue-600 hover:underline"
            } transition-colors duration-200`}
          >
            {part.text}
          </a>
        );
      } else if (part.type === "numbered-item") {
        if (!currentList || currentList.type !== "numbered") {
          closeCurrentList();
          currentList = { type: "numbered", items: [] };
        }
        currentList.items.push(
          <li key={`li-${index}`} className="text-sm">
            {part.content}
          </li>
        ); // Adjusted size
      } else if (part.type === "bulleted-item") {
        if (!currentList || currentList.type !== "bulleted") {
          closeCurrentList();
          currentList = { type: "bulleted", items: [] };
        }
        currentList.items.push(
          <li key={`li-${index}`} className="text-sm">
            {part.content}
          </li>
        ); // Adjusted size
      }
    });

    closeCurrentList();

    return result;
  };

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
      ...(file && { fileName: file.name, fileType: file.type }),
    };

    const tempMessages = [...messages, userMessage];
    setMessages(tempMessages);
    setInput("");
    setFile(null);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          // Only send the current conversation's history
          history: messages
            .filter((msg) => msg.role === "user")
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini");
      }

      const data = await response.json();

      const botMessage = {
        role: "bot",
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      const newMessages = [...tempMessages, botMessage];
      setMessages(newMessages);
      // No need to set chatHistory here if we only store the current conversation
      // localStorage will update via useEffect for messages
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "bot",
        content: "Sorry, I couldn't process your request.",
        timestamp: new Date().toISOString(),
      };
      setMessages([...tempMessages, errorMessage]);
      // localStorage will update via useEffect for messages
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : "*";
      fileInputRef.current.click();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setFile(null); // Clear any attached file on new chat
    localStorage.removeItem("chatHistory"); // Clear history for new chat
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* This component no longer contains the main navigation or sidebar */}
      {/* Its height and width are controlled by the parent div in Home.js */}

      <div className="flex-1 overflow-y-auto p-3">
        {" "}
        {/* Adjusted padding */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bot size={32} className="mb-2" /> {/* Adjusted size */}
            <h3 className="text-md font-medium">
              How can I help you today?
            </h3>{" "}
            {/* Adjusted size */}
            <p className="text-xs mt-1">Start a new conversation</p>{" "}
            {/* Adjusted size */}
            <button
              onClick={startNewChat}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {" "}
            {/* Adjusted spacing */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] leading-relaxed text-sm ${
                    // Adjusted max-width and padding
                    msg.role === "user"
                      ? "bg-blue-100 text-black"
                      : msg.content.includes("```")
                        ? "bg-white text-black border border-gray-200 shadow-sm p-3"
                        : "bg-transparent text-black"
                  }`}
                  style={{
                    fontSize: "0.875rem", // Tailwind's text-sm
                    lineHeight: "1.5", // Standard line height
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.role === "bot" && msg.content.includes("```") ? (
                    <div className="overflow-x-auto">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-md text-xs font-mono whitespace-pre-wrap">
                        {" "}
                        {/* Adjusted padding and font size */}
                        {msg.content.replace(/```/g, "")}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-sm text-black">
                      {" "}
                      {/* Adjusted size */}
                      {renderMessageContent(msg.content)}
                    </div>
                  )}
                  {msg.fileName && (
                    <div className="mt-1 text-xs text-gray-500">
                      {" "}
                      {/* Adjusted margin */}
                      Attachment: {msg.fileName}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatDate(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  {" "}
                  {/* Adjusted padding */}
                  <div className="flex space-x-1">
                    {" "}
                    {/* Adjusted spacing */}
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <div className="px-3 pb-3 mt-auto">
        {" "}
        {/* Adjusted padding and margin */}
        <div className="flex items-center p-1.5 border border-gray-200 bg-white rounded-lg shadow-sm w-full mx-auto">
          <div className="flex items-center space-x-1 mr-1.5">
            <button
              onClick={() => triggerFileInput("document")}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors" // Adjusted padding
              aria-label="Upload document"
            >
              <Paperclip size={16} className="w-3.5 h-3.5" />{" "}
              {/* Adjusted size */}
            </button>
            <button
              onClick={() => triggerFileInput("image")}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors" // Adjusted padding
              aria-label="Upload image"
            >
              <Image size={16} className="w-3.5 h-3.5" /> {/* Adjusted size */}
            </button>
          </div>
          <input
            ref={inputEl}
            className="flex-1 p-2 bg-gray-50 text-black border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ASC-cm..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="ml-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 min-w-[2.5rem]"
            disabled={loading || (!input.trim() && !file)}
          >
            {loading ? (
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></div>
              </div>
            ) : (
              <SendHorizonal
                size={16} // Adjusted size
                className="w-3.5 h-3.5"
              />
            )}
          </button>
        </div>
        {file && (
          <div className="text-[0.65rem] text-gray-500 mt-1 text-center">
            {" "}
            {/* Adjusted size */}
            File: {file.name.substring(0, 20)}
            {file.name.length > 20 && "..."}
            <button
              onClick={() => setFile(null)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}
        <div className="text-xs text-gray-500 text-center mt-1">
          Chatbox with AI-generated content for reference only
        </div>
      </div>
    </div>
  );
}
