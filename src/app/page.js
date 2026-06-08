"use client";
import { useState, useEffect } from "react";
import { X, MessageSquare, RefreshCw, Zap } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import UpcomingEvents from "@/components/UpcomingEvents";
import AIChatboxContent from "@/components/AIChatboxContent";
import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      setIsInitialized(true);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleNewChat = () => {
    setChatKey((prevKey) => prevKey + 1);
  };

  // Close chat on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isChatOpen]);

  return (
    <>
      <main className="relative">
        <Hero />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <StatisticsSection />
        <UpcomingEvents />
        <ContactForm />

        {/* Ask AI Button */}
        <button
          onClick={toggleChat}
          className={`fixed bottom-6 right-6 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full px-4 py-3 shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 z-50 cursor-pointer group ${isChatOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-label="Ask ASC-cm AI Assistant"
          title="Chat with ASC-cm AI Assistant"
        >
          <div className="relative">
            <MessageSquare
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <Zap
              size={12}
              className="absolute -top-1 -right-1 text-yellow-300 animate-pulse"
            />
          </div>
          <span className="font-semibold text-base">Ask AI</span>
        </button>

        {/* Chatbox */}
        {isChatOpen && isInitialized && (
          <div
            className={`fixed ${isMobile ? "inset-0 z-50" : "bottom-24 right-6 w-[420px] h-[600px] z-50"} bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isMobile ? "rounded-none" : ""}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-1 rounded-lg">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="font-bold text-sm">ASC-cm Assistant</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">AI Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors group"
                  aria-label="Start new chat"
                  title="New Chat"
                >
                  <RefreshCw
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                  title="Close Chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat content */}
            <div className="flex-grow overflow-hidden">
              <AIChatboxContent key={chatKey} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
