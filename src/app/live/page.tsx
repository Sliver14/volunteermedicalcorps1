"use client";

import { useState, useRef, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";

export default function LiveStreamPage() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Dr. Adebayo", text: "Excited for the broadcast!", time: "10:00 AM" },
    { id: 2, user: "Sarah J.", text: "Watching live from London. Greetings everyone.", time: "10:02 AM" },
    { id: 3, user: "VMC Admin", text: "Welcome to the stream! We will begin shortly.", time: "10:05 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: "You",
        text: newMessage,
        time: timeString,
      }
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <PageBanner title="VMC Live Stream" />

      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Column: Video Player */}
            <div className="lg:w-2/3 flex flex-col">
              <div className="bg-[#002866] p-4 text-center rounded-t-sm shadow-md">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-white font-bold uppercase tracking-widest text-sm">Live Broadcast</span>
              </div>

              {/* Video Player Placeholder */}
              <div className="relative pt-[56.25%] bg-black shadow-2xl rounded-b-sm overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                  <svg className="w-24 h-24 mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-poppins tracking-wider text-center px-4">The live stream has not started yet.</h3>
                  <p className="mt-2 text-sm text-center px-4">Please check back later during scheduled broadcast times.</p>
                </div>
              </div>

              {/* Upcoming Schedule */}
              <div className="mt-8 bg-white p-6 md:p-8 border border-gray-100 shadow-sm rounded-sm">
                <h2 className="text-2xl font-poppins font-bold text-[#002866] mb-4">Upcoming Broadcasts</h2>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b border-gray-100 gap-2 md:gap-0">
                    <div>
                      <h4 className="font-bold text-gray-900">Global Hospital Outreach Kick-off</h4>
                      <p className="text-sm text-gray-500">Join our leadership as we officially launch the GHOC.</p>
                    </div>
                    <div className="md:text-right">
                      <span className="block text-[#002866] font-bold">Oct 15, 2026</span>
                      <span className="text-sm text-gray-500">14:00 GMT</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b border-gray-100 gap-2 md:gap-0">
                    <div>
                      <h4 className="font-bold text-gray-900">VMC Academy Live Webinar</h4>
                      <p className="text-sm text-gray-500">Training session for medical volunteers.</p>
                    </div>
                    <div className="md:text-right">
                      <span className="block text-[#002866] font-bold">Oct 22, 2026</span>
                      <span className="text-sm text-gray-500">10:00 GMT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Chat */}
            <div className="lg:w-1/3 flex flex-col h-[500px] lg:h-auto bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              <div className="bg-gray-100 p-4 border-b border-gray-200 text-[#002866] font-bold flex justify-between items-center">
                <span>Live Chat</span>
                <span className="text-xs bg-[#ff9f22] text-[#002866] px-2 py-1 rounded-full uppercase tracking-wider">{messages.length}</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 text-sm">
                    <FaUserCircle className={`text-2xl mt-0.5 ${msg.user === 'VMC Admin' ? 'text-[#ff9f22]' : 'text-gray-400'}`} />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className={`font-bold ${msg.user === 'VMC Admin' ? 'text-[#002866]' : 'text-gray-800'}`}>
                          {msg.user}
                        </span>
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-gray-600 mt-0.5 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Say something..."
                    className="w-full bg-white border border-gray-300 rounded-sm py-3 pl-4 pr-12 focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866] transition-colors"
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#002866] hover:text-[#ff9f22] disabled:text-gray-300 transition-colors p-2"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  Please be respectful in the chat.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
