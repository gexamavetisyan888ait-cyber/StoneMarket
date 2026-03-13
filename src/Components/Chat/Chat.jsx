import React, { useEffect, useState, useRef } from "react";
import { ref, onValue, push, serverTimestamp, remove } from "firebase/database"; 
import { db } from "../../lib/firebase";
import { Phone, Paperclip, Send, Trash2 } from "lucide-react";

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
          text: data[key].text || data[key],
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
    await push(chatRef, { text: message, timestamp: serverTimestamp() });
    setMessage("");
  };

  const clearChat = async () => {
    if (window.confirm("Վստա՞հ եք, որ ուզում եք ջնջել ամբողջ պատմությունը:")) {
      await remove(ref(db, "db/Chat"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#F3F4F6] p-0 md:p-6 lg:p-10">
      
     
      <div className="flex flex-col w-full max-w-2xl h-dvh md:h-[85vh] bg-white md:rounded-2xl shadow-2xl overflow-hidden border-none md:border md:border-gray-200">
        
        <header className="shrink-0 px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <img 
              className="w-10 h-10 md:w-12 md:h-12 bg-[#56C596] rounded-full object-cover" 
              src="https://stonemarket.am/images/user.svg" 
              alt="Admin"
            />
            <div>
              <h2 className="font-bold text-gray-800 text-base md:text-lg leading-tight">Ադմին</h2>
              <p className="text-[10px] md:text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Առցանց
              </p>
            </div>
          </div>
          <div className="flex gap-1 md:gap-3">
            <button onClick={clearChat} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <Trash2 size={20} className="md:w-[22px]" />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Phone size={20} className="md:w-[22px]" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#F9FAFB] custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className="flex justify-end animate-in slide-in-from-bottom-1 duration-300">
              <div className="flex flex-col items-end max-w-[85%] md:max-w-[75%]">
                <div className="bg-[#111827] text-white px-4 md:px-5 py-2 md:py-3 rounded-2xl rounded-tr-none shadow-md">
                  <p className="text-sm md:text-[15px] leading-relaxed break-words">{msg.text}</p>
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-400 mt-1 px-1 font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </main>

        <footer className="shrink-0 p-3 md:p-5 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 md:gap-4 bg-[#F3F4F6] rounded-xl md:rounded-2xl px-3 md:px-5 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 transition-all border border-transparent focus-within:border-green-200">
            <button className="p-1 md:p-2 text-gray-400 hover:text-gray-600">
              <Paperclip size={20} className="md:w-6" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Գրեք հաղորդագրություն..."
              className="flex-1 bg-transparent border-none py-2 md:py-3 px-1 focus:outline-none text-sm md:text-[15px] text-gray-700"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all ${
                message.trim() 
                ? "bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={18} className="md:w-5" fill={message.trim() ? "white" : "none"} />
            </button>
          </div>
        </footer >
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar { width: 0px; } /* Հեռախոսի վրա թաքցնում ենք սքրոլը */
        }
      `}} />
    </div>
  );
}