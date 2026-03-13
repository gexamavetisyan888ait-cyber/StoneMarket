import React, { useEffect, useState, useRef } from "react";
import { ref, onValue, push, serverTimestamp, remove } from "firebase/database"; 
import { db } from "../../lib/firebase";
import { Phone, Image as ImageIcon, Paperclip, Send, Trash2 } from "lucide-react";

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
    <div className="flex items-center justify-center  bg-[#F3F4F6] p-4 md:p-10">
      
      {/* Լայնությունը հարմարեցված է (672px), բարձրությունը՝ էկրանի 90%-ը */}
      <div className="flex flex-col w-full max-w-1xl h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header - Ավելի ընդարձակ */}
        <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 bg-[#56C596] rounded-full flex items-center justify-center text-white text-xl font-bold" src="https://stonemarket.am/images/user.svg"/>
            
            <div>
              <h2 className="font-bold text-gray-800 text-lg leading-tight">Ադմին</h2>
              <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Առցանց
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={clearChat} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <Trash2 size={22} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Phone size={22} />
            </button>
          </div>
        </header>

        {/* Messages Area - Հարմարավետ սքրոլով */}
        <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F9FAFB] custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className="flex justify-end animate-in slide-in-from-bottom-1 duration-300">
              <div className="flex flex-col items-end max-w-[80%] md:max-w-[70%]">
                <div className="bg-[#111827] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md">
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 px-1 font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </main>

        {/* Input Area - Լայն և հարմար */}
        <footer className="p-5 bg-white border-t border-gray-100">
          <div className="flex items-center gap-4 bg-[#F3F4F6] rounded-2xl px-5 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 transition-all border border-transparent focus-within:border-green-200">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
              <Paperclip size={24} />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Գրեք Ձեր հաղորդագրությունը..."
              className="flex-1 bg-transparent border-none py-3 px-1 focus:outline-none text-[15px] text-gray-700 placeholder:text-gray-400"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`p-3 rounded-xl transition-all shadow-sm ${
                message.trim() 
                ? "bg-green-500 text-white hover:bg-green-600 shadow-green-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={20} fill={message.trim() ? "white" : "none"} />
            </button>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}} />
    </div>
  );
}