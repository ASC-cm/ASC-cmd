"use client";
import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, AlertCircle, RefreshCw } from "lucide-react";

export default function AIChatboxContent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! I'm the ASC-cm AI Assistant. I can help you with information about our software development services, company details, and more. What would you like to know?",
        timestamp: new Date().toISOString(),
      },
    ]);

    // Test API connection on mount
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "test connection",
          history: [],
        }),
      });

      if (response.ok) {
        setApiStatus("connected");
      } else {
        setApiStatus("error");
      }
    } catch {
      setApiStatus("error");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const tempMessages = [...messages, userMessage];
    setMessages(tempMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      console.log("Sending message to API:", input);

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input.trim(),
          history: messages.slice(-6).map((msg) => ({
            role: msg.role === "bot" ? "model" : "user",
            content: msg.content,
          })),
        }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || `API error ${response.status}`);
      }

      const botMessage = {
        role: "bot",
        content:
          data.response || "I received your message but got an empty response.",
        timestamp: new Date().toISOString(),
      };

      setMessages([...tempMessages, botMessage]);
      setApiStatus("connected");
    } catch (error) {
      console.error("Chat Error:", error);
      setError(error.message);

      const errorMessage = {
        role: "bot",
        content: `I encountered an error: "${error.message}". 

This might be due to:
1. API configuration issues
2. Network connectivity
3. Service temporarily unavailable

For immediate assistance:
• Email: contact@asc-cm.com.ng
• Phone: +234 703 441 8309
• Website: https://asc-cm.com.ng`,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages([...tempMessages, errorMessage]);
      setApiStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMessageContent = (content) => {
    return content.split("\n").map((line, index) => {
      if (!line.trim()) return <div key={index} className="h-3"></div>;

      if (line.trim().startsWith("•")) {
        return (
          <div key={index} className="flex items-start py-0.5">
            <span className="mr-2 mt-1 text-xs">•</span>
            <span className="text-sm">{line.substring(1).trim()}</span>
          </div>
        );
      }

      return (
        <div key={index} className="text-sm py-1">
          {line}
        </div>
      );
    });
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! I'm the ASC-cm AI Assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
    setError(null);
    setApiStatus("connected");
  };

  const retryConnection = () => {
    testApiConnection();
    setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Status Bar */}
      {apiStatus === "error" && (
        <div className="bg-red-50 border-b border-red-200 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-red-700 text-sm">
              <AlertCircle size={14} className="mr-2" />
              <span>AI service disconnected</span>
            </div>
            <button
              onClick={retryConnection}
              className="text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded flex items-center"
            >
              <RefreshCw size={12} className="mr-1" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 text-black"
                    : msg.isError
                      ? "bg-red-50 border border-red-200"
                      : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="space-y-1">
                  {formatMessageContent(msg.content)}
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    {msg.role === "user" ? "You" : "ASC-cm Assistant"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg max-w-[85%]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about ASC-cm services, team, or projects..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[60px]"
          >
            {loading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
              </div>
            ) : (
              <SendHorizonal size={20} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={clearChat}
            className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-3 py-1 rounded transition-colors"
          >
            Clear Chat
          </button>

          <div className="flex items-center text-xs">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                apiStatus === "connected"
                  ? "bg-green-500 animate-pulse"
                  : apiStatus === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            ></div>
            <span className="text-gray-500">
              {apiStatus === "connected"
                ? "AI Connected"
                : apiStatus === "error"
                  ? "AI Disconnected"
                  : "Checking..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
