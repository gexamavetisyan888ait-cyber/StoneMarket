import React, { useEffect, useState, useRef } from "react";
import { 
  ref, 
  onValue, 
  push, 
  serverTimestamp, 
  remove, 
  onDisconnect, 
  set 
} from "firebase/database"; 
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { db, auth, googleProvider } from "../../lib/firebase"; 
import { Paperclip, Send, Trash2, Users, LogOut } from "lucide-react";

export default function ChatUI() {
  const [user, setUser] = useState(null); 
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]); // Բոլոր online օգտատերերի ցուցակը
  const [onlineCount, setOnlineCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  // 1. Auth վիճակ
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Chat & Presence (Online Status)
  useEffect(() => {
    if (!user) return;

    const chatRef = ref(db, "db/Chat");
    const userStatusRef = ref(db, `db/status/${user.uid}`);
    const connectedRef = ref(db, ".info/connected");
    const allStatusesRef = ref(db, "db/status");

    // Լսում ենք հաղորդագրությունները
    const unsubscribeChat = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setMessages(formatted);
      } else {
        setMessages([]);
      }
    });

    // Սահմանում ենք online կարգավիճակը և նկարը
    const unsubscribeConn = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        set(userStatusRef, {
          state: "online",
          last_changed: serverTimestamp(),
          displayName: user.displayName,
          photo: user.photoURL // Պահում ենք նկարը բազայում
        });
        onDisconnect(userStatusRef).remove();
      }
    });

    // Լսում ենք բոլոր online օգտատերերին
    const unsubscribeStatus = onValue(allStatusesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => ({
          uid: key,
          ...data[key]
        }));
        setOnlineUsers(usersArray);
        setOnlineCount(usersArray.length);
      } else {
        setOnlineUsers([]);
        setOnlineCount(0);
      }
    });

    return () => {
      unsubscribeChat();
      unsubscribeConn();
      unsubscribeStatus();
    };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Ֆունկցիաներ ---
  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  const clearChat = async () => {
    if (window.confirm("Ցանկանու՞մ եք ջնջել ամբողջ չաթի պատմությունը:")) {
      const chatRef = ref(db, "db/Chat");
      try {
        await remove(chatRef);
        setMessages([]);
      } catch (error) {
        console.error("Ջնջելու սխալ:", error);
      }
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;
    const chatRef = ref(db, "db/Chat");
    await push(chatRef, { 
      text: message, 
      timestamp: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photo: user.photoURL
    });
    setMessage("");
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black">ԲԵՌՆՎՈՒՄ Է...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3F4F6] p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl text-center border border-gray-100">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200">
               <Users size={40} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-2 uppercase tracking-tighter italic">Stone Market Chat</h1>
          <p className="text-gray-500 mb-8 text-sm">Մուտք գործեք համակարգ՝ հաղորդագրություններ ուղարկելու համար:</p>
          <button 
            onClick={login}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6" alt="G" />
            Մուտք Google-ով
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#F3F4F6] p-0 md:p-6 lg:p-10 font-sans">
      <div className="flex flex-col w-full max-w-8xl h-dvh md:h-[85vh] bg-white md:rounded-2xl shadow-2xl overflow-hidden border-none md:border md:border-gray-200">
        
        {/* HEADER */}
        <header className="shrink-0 px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Online Օգտատերերի Ավատարները */}
            <div className="flex -space-x-3 overflow-hidden">
              {onlineUsers.map((onlineUser) => (
                <div key={onlineUser.uid} className="relative inline-block" title={onlineUser.displayName}>
                  <img 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                    src={onlineUser.photo || "https://stonemarket.am/images/user.svg"} 
                    alt={onlineUser.displayName}
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] md:text-xs text-green-600 font-bold flex items-center gap-1 uppercase tracking-wider">
                <Users size={12} /> {onlineCount} Առցանց
              </p>
            </div>
          </div>
          
          <div className="flex gap-1 md:gap-2">
            <button onClick={clearChat} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Ջնջել չաթը">
              <Trash2 size={20} />
            </button>
            <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Դուրս գալ">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* MESSAGES */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#F9FAFB] custom-scrollbar">
          {messages.map((msg) => {
            const isMine = msg.uid === user.uid;
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-[85%] md:max-w-[75%]`}>
                  {!isMine && <span className="text-[10px] text-gray-400 mb-1 ml-2 font-bold">{msg.displayName}</span>}
                  <div className={`px-4 md:px-5 py-2 md:py-3 rounded-2xl shadow-sm ${
                    isMine 
                    ? "bg-[#111827] text-white rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  }`}>
                    <p className="text-sm md:text-[15px] leading-relaxed break-words">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1 font-medium italic">
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </main>

        {/* FOOTER INPUT */}
        <footer className="shrink-0 p-3 md:p-5 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 md:gap-4 bg-[#F3F4F6] rounded-xl md:rounded-2xl px-3 md:px-5 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 transition-all border border-transparent focus-within:border-green-200">
            <button className="p-1 md:p-2 text-gray-400 hover:text-gray-600 transition">
              <Paperclip size={20} />
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
                message.trim() ? "bg-green-500 text-white shadow-md shadow-green-100" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={18} fill={message.trim() ? "white" : "none"} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}