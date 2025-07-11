"use client";
import { useState, useEffect } from "react";
import { X, MessageSquare, RefreshCw } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import UpcomingEvents from "@/components/UpcomingEvents";
import AIChatboxContent from "@/components/AIChatboxContent";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
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

  return (
    <>
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <UpcomingEvents />
        <ContactForm />

        {/* Ask AI Button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 flex items-center space-x-2 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50 cursor-pointer"
          aria-label="Ask AI"
        >
          <MessageSquare size={24} />
          <span className="font-semibold text-base">Ask AI</span>
        </button>

        {/* Chatbox */}
        {isChatOpen && (
          <div
            className={`fixed ${
              isMobile ? "inset-0" : "bottom-24 right-6 w-80 h-[500px]"
            } bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden ${
              isMobile ? "rounded-none" : ""
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg flex-shrink-0">
              <span className="font-semibold">AI Assistant</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleNewChat}
                  className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="New chat"
                  title="Start a new chat"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat content */}
            <div className="flex-grow overflow-y-auto">
              <AIChatboxContent key={chatKey} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
