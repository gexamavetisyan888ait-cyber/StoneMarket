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
import { Paperclip, Send, Trash2, Users, LogOut, MessageCircle, ChevronLeft } from "lucide-react";

export default function ChatUI() {
  const [user, setUser] = useState(null); 
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userStatusRef = ref(db, `db/status/${user.uid}`);
    const connectedRef = ref(db, ".info/connected");
    const allUsersRef = ref(db, "db/status");

    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        set(userStatusRef, {
          uid: user.uid,
          state: "online",
          last_changed: serverTimestamp(),
          displayName: user.displayName,
          photo: user.photoURL 
        });
        onDisconnect(userStatusRef).update({
          state: "offline",
          last_changed: serverTimestamp()
        });
      }
    });

    const unsubscribeUsers = onValue(allUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => ({
          uid: key,
          ...data[key]
        }));
        setAllUsers(usersArray);
      }
    });

    return () => unsubscribeUsers();
  }, [user]);

  useEffect(() => {
    if (!user || !selectedUser) {
        setMessages([]);
        return;
    }

    const combinedId = user.uid > selectedUser.uid 
      ? `${user.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${user.uid}`;

    const chatRef = ref(db, `db/chats/${combinedId}`);

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

    return () => unsubscribeChat();
  }, [user, selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  // Չաթի ջնջման ֆունկցիան
  const clearChat = async () => {
    if (!user || !selectedUser) return;
    
    if (window.confirm(`Ցանկանու՞մ եք ջնջել ${selectedUser.displayName}-ի հետ չաթի պատմությունը:`)) {
      const combinedId = user.uid > selectedUser.uid 
        ? `${user.uid}_${selectedUser.uid}` 
        : `${selectedUser.uid}_${user.uid}`;
      
      const chatRef = ref(db, `db/chats/${combinedId}`);
      try {
        await remove(chatRef);
        setMessages([]);
      } catch (error) {
        console.error("Ջնջելու սխալ:", error);
      }
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !user || !selectedUser) return;

    const combinedId = user.uid > selectedUser.uid 
      ? `${user.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${user.uid}`;

    const chatRef = ref(db, `db/chats/${combinedId}`);
    
    await push(chatRef, { 
      text: message, 
      timestamp: serverTimestamp(),
      senderId: user.uid,
      displayName: user.displayName
    });
    setMessage("");
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black bg-[#F3F4F6] text-gray-400">ԲԵՌՆՎՈՒՄ Է...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3F4F6] p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl text-center border border-gray-100 font-sans">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
               <Users size={40} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-2 uppercase italic tracking-tighter">Stone Market Chat</h1>
          <button onClick={login} className="w-full mt-6 flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl">
            Մուտք Google-ով
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#F3F4F6] p-0 md:p-6 font-sans">
      <div className="flex w-full max-w-7xl h-dvh md:h-[85vh] bg-white md:rounded-[2rem] shadow-2xl overflow-hidden">
        
        <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-gray-100 flex-col bg-white`}>
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-black text-xl text-gray-800 uppercase italic tracking-tighter">Users</h2>
            <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500" title="Ելք">
                <LogOut size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {allUsers.filter(u => u.uid !== user.uid).map((u) => (
              <button
                key={u.uid}
                onClick={() => setSelectedUser(u)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  selectedUser?.uid === u.uid ? "bg-green-50 shadow-sm" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative shrink-0">
                  <img src={u.photo || "https://stonemarket.am/images/user.svg"} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${u.state === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
                <div className="text-left overflow-hidden">
                  <p className="font-bold text-gray-800 text-sm truncate">{u.displayName}</p>
                  <p className={`text-[10px] font-black uppercase ${u.state === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
                    {u.state === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#F9FAFB]`}>
          {selectedUser ? (
            <>
              <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedUser(null)} className="md:hidden p-1 text-gray-400">
                    <ChevronLeft size={24} />
                  </button>
                  <img src={selectedUser.photo} className="w-10 h-10 rounded-full border border-gray-100" alt="" />
                  <div>
                    <h3 className="font-black text-gray-800 text-sm uppercase">{selectedUser.displayName}</h3>
                    <p className={`text-[9px] font-bold ${selectedUser.state === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
                      {selectedUser.state === 'online' ? 'ԱՌՑԱՆՑ' : 'ՈՉ ԱՌՑԱՆՑ'}
                    </p>
                  </div>
                </div>
                <button onClick={clearChat} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Ջնջել այս չաթը">
                  <Trash2 size={20} />
                </button>
              </header>

              <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
                {messages.map((msg) => {
                  const isMine = msg.senderId === user.uid;
                  return (
                    <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm max-w-[80%] ${
                        isMine ? "bg-gray-900 text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className="text-[9px] opacity-50 block mt-1 text-right italic">
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </main>

              <footer className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 transition-all border border-transparent">
                  <button className="p-1 text-gray-400 hover:text-gray-600"><Paperclip size={20} /></button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Գրեք հաղորդագրություն..."
                    className="flex-1 bg-transparent border-none py-3 focus:outline-none text-sm"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button onClick={sendMessage} disabled={!message.trim()} className="p-2 bg-green-500 text-white rounded-xl disabled:bg-gray-300 transition-all active:scale-95">
                    <Send size={18} />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 p-10 text-center">
              <MessageCircle size={64} className="mb-4 opacity-20" />
              <h4 className="text-gray-800 font-black uppercase italic tracking-tighter mb-1">Stone Market Chat</h4>
              <p className="text-xs font-medium uppercase tracking-widest">Ընտրեք որևէ մեկին խոսակցություն սկսելու համար</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}