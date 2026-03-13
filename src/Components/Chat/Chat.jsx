import React, { useEffect, useState, useRef } from "react";
// Ավելացված է 'remove' ներմուծումը
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
    await push(chatRef, {
      text: message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  // Չաթի մաքրման ֆունկցիան
  const clearChat = async () => {
    const isConfirmed = window.confirm("Վստա՞հ եք, որ ուզում եք ջնջել ամբողջ պատմությունը:");
    if (isConfirmed) {
      try {
        await remove(ref(db, "db/Chat"));
      } catch (error) {
        console.error("Ջնջելիս սխալ տեղի ունեցավ:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F5] overflow-hidden">
      
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200 z-10">
        <header className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#56C596] rounded-full flex items-center justify-center text-white font-bold">
              Ա
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 leading-tight">Ադմին</h2>
              <p className="text-xs text-green-500">Առցանց</p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Ջնջելու կոճակը տեղափոխեցի վերև, որպեսզի ներքևի դաշտը ավելի մաքուր լինի */}
            <button 
              onClick={clearChat}
              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
              title="Մաքրել չաթը"
            >
              <Trash2 size={20} />
            </button>
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <ImageIcon size={20} />
            </button>
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Phone size={20} />
            </button>
          </div>
        </header>
      </div>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex justify-end group">
              <div className="flex flex-col items-end max-w-[75%] md:max-w-[60%]">
                <div className="bg-[#111827] text-white px-4 py-2.5 rounded-[18px] rounded-tr-[2px] shadow-sm">
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="w-full bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#F0F2F5] rounded-2xl px-4 py-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300 transition-all">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Paperclip size={22} />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Հաղորդագրություն..."
            className="flex-1 bg-transparent border-none py-2.5 px-1 focus:outline-none text-gray-700 placeholder:text-gray-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className={`p-2.5 rounded-full transition-all ${
              message.trim() ? "text-blue-600 hover:bg-blue-50" : "text-gray-300"
            }`}
          >
            <Send size={22} fill={message.trim() ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}} />
    </div>
  );
}