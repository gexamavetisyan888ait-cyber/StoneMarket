import React, { useEffect, useState, useRef } from "react";
import { ref, onValue, push, remove, serverTimestamp } from "firebase/database";
import { db } from "../../lib/firebase";
import { Phone, Image as ImageIcon, Paperclip, Send } from "lucide-react";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const chatRef = ref(db, "db/Chat");
    const unsubscribe = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text || data[key], // Աջակցում է և՛ հին, և՛ նոր ֆորմատին
          timestamp: data[key].timestamp || Date.now(),
        }));
        setMessages(formatted);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const chatRef = ref(db, "db/Chat");
    await push(chatRef, {
      text: message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header - Նման նկարի վերնագրին */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
            <span className="sr-only">User Avatar</span>
            <div className="w-full h-full rounded-full bg-[#56C596] flex items-center justify-center">
               <ImageIcon size={20} className="text-white opacity-80" />
            </div>
          </div>
          <span className="font-medium text-gray-800 text-lg">Ադմին</span>
        </div>
        <div className="flex gap-4">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg border border-gray-200 transition">
            <ImageIcon size={20} className="text-gray-600" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg border border-gray-200 transition">
            <Phone size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Message Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#F9FAFB]">
        {messages.map((msg) => (
          <div key={msg.id} className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-[80%] md:max-w-md bg-[#111827] text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm relative group">
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
              <div className="text-[10px] text-gray-400 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Input Area - Հարմարեցված նկարի ներքևի մասին */}
      <footer className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-green-400 transition-all">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden hidden sm:block">
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
               <span className="text-xs">👤</span>
            </div>
          </div>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Հաղորդագրություն"
            className="flex-1 bg-transparent border-none py-2 px-1 focus:outline-none text-gray-700 placeholder:text-gray-400"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-green-500 transition">
              <Paperclip size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="p-2 bg-[#E8F0FE] text-gray-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}