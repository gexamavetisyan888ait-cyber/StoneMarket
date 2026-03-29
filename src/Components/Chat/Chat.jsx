import React, { useEffect, useState, useRef } from "react";
import {
  ref,
  onValue,
  push,
  serverTimestamp,
  remove,
  onDisconnect,
  set,
  update,
  onChildAdded,
  off,
} from "firebase/database";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth, googleProvider } from "../../lib/firebase";
import { Users, LogOut, MessageCircle, ChevronLeft, Send, Trash2, Phone, PhoneOff, Mic, MicOff, Clock } from "lucide-react";

const servers = {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }
  ],
  iceCandidatePoolSize: 10,
};

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [totalUnread, setTotalUnread] = useState(0);

  // Call States
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLocalInitiator, setIsLocalInitiator] = useState(false);

  // Refs
  const audioRef = useRef(null);
  const ringtoneRef = useRef(null);
  const pc = useRef(null);
  const timerRef = useRef(null);
  const currentCallIdRef = useRef(null);

  useEffect(() => {
    const soundUrl = "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3";
    audioRef.current = new Audio(soundUrl);
    const ringtoneUrl = "https://assets.mixkit.co/active_storage/sfx/1358/1358-preview.mp3";
    ringtoneRef.current = new Audio(ringtoneUrl);
    ringtoneRef.current.loop = true;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerActive]);

  const formatTime = (seconds) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const cleanupCall = (reason = "Normal") => {
    console.log(`[Cleanup] Cleaning up call. Reason: ${reason}`);
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setIncomingCall(null);
    setIsMuted(false);
    setIsTimerActive(false);
    setIsLocalInitiator(false);
    setCallDuration(0);
    currentCallIdRef.current = null;
    ringtoneRef.current?.pause();
    if (ringtoneRef.current) ringtoneRef.current.currentTime = 0;
  };

  // Signalling Listener with Debug Logs
  useEffect(() => {
    if (!user) return;
    
    const callsRef = ref(db, 'calls');
    const unsubscribe = onValue(callsRef, (snapshot) => {
      const allCalls = snapshot.val();
      
      if (!allCalls) {
        if (isCalling || incomingCall) {
          console.log("[Signalling] No calls in DB, cleaning up...");
          cleanupCall("No calls in DB");
        }
        return;
      }

      const myCallId = Object.keys(allCalls).find(key => 
        allCalls[key].targetId === user.uid || allCalls[key].callerId === user.uid
      );

      if (!myCallId) {
        if (!isLocalInitiator && (isCalling || incomingCall)) {
          console.log("[Signalling] My call ID not found, cleaning up...");
          cleanupCall("Call ID missing");
        }
        return;
      }

      const callData = allCalls[myCallId];
      currentCallIdRef.current = myCallId;
      console.log(`[Signalling] Current Status: ${callData.status} | CallID: ${myCallId}`);

      // Incoming Call (Target)
      if (callData.targetId === user.uid && callData.status === "offer") {
        if (!isCalling && !incomingCall) {
          console.log("[Signalling] New incoming call detected");
          setIncomingCall({ ...callData, callId: myCallId });
          ringtoneRef.current?.play().catch(() => {});
        }
      } 
      
      // Active Call
      if (callData.status === "active") {
        console.log("[Signalling] Call status is ACTIVE. Starting timer.");
        setIsTimerActive(true);
        setIsCalling(true); 
        setIncomingCall(null);
        ringtoneRef.current?.pause();
      }

      // Ended Call
      if (callData.status === "ended") {
        console.log("[Signalling] Call status is ENDED.");
        cleanupCall("Call ended by status");
      }
    });

    return () => off(callsRef);
  }, [user, isCalling, incomingCall, isLocalInitiator]);

  const setupWebRTC = async (stream) => {
    console.log("[WebRTC] Setting up PeerConnection...");
    pc.current = new RTCPeerConnection(servers);
    
    stream.getTracks().forEach(track => {
      console.log(`[WebRTC] Adding local track: ${track.kind}`);
      pc.current.addTrack(track, stream);
    });

    pc.current.ontrack = (event) => {
      console.log("[WebRTC] Remote track received");
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    pc.current.oniceconnectionstatechange = () => {
      console.log(`[WebRTC] ICE Connection State: ${pc.current?.iceConnectionState}`);
    };

    return pc.current;
  };

  const startCall = async () => {
    if (!selectedUser || !user) return;
    console.log(`[Action] Starting call to: ${selectedUser.displayName}`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[Action] Local stream acquired");
      setLocalStream(stream);
      setIsLocalInitiator(true);
      setIsCalling(true); 
      
      const callId = user.uid; 
      currentCallIdRef.current = callId;

      const peerConnection = await setupWebRTC(stream);
      const callRef = ref(db, `calls/${callId}`);
      const offerCandidatesRef = ref(db, `calls/${callId}/offerCandidates`);
      const answerCandidatesRef = ref(db, `calls/${callId}/answerCandidates`);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("[WebRTC] Local ICE candidate found");
          push(offerCandidatesRef, event.candidate.toJSON());
        }
      };

      const offerDescription = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offerDescription);
      console.log("[Action] Offer created and set as local description");

      const callPayload = {
        offer: { type: offerDescription.type, sdp: offerDescription.sdp },
        callerId: user.uid,
        callerName: user.displayName,
        callerPhoto: user.photoURL,
        targetId: selectedUser.uid,
        targetName: selectedUser.displayName,
        targetPhoto: selectedUser.photo,
        status: "offer",
        timestamp: serverTimestamp()
      };

      await set(callRef, callPayload);
      console.log("[Firebase] Offer uploaded to DB");

      onValue(callRef, (snapshot) => {
        const data = snapshot.val();
        if (data?.answer && peerConnection.signalingState !== "stable") {
          console.log("[Firebase] Answer received from target");
          peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });

      onChildAdded(answerCandidatesRef, (snapshot) => {
        console.log("[WebRTC] Adding remote ICE candidate");
        const candidate = new RTCIceCandidate(snapshot.val());
        peerConnection.addIceCandidate(candidate).catch(e => console.error("ICE Error:", e));
      });

    } catch (err) {
      console.error("[Error] Error in startCall:", err);
      cleanupCall("Error in startCall");
    }
  };

  const answerCall = async () => {
    if (!incomingCall || !user) return;
    const callId = incomingCall.callId;
    console.log(`[Action] Answering call from: ${incomingCall.callerName}`);
    
    ringtoneRef.current?.pause();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[Action] Local stream acquired for answering");
      setLocalStream(stream);
      setIsCalling(true);
      setIsLocalInitiator(false); 

      const peerConnection = await setupWebRTC(stream);
      const callRef = ref(db, `calls/${callId}`);
      const offerCandidatesRef = ref(db, `calls/${callId}/offerCandidates`);
      const answerCandidatesRef = ref(db, `calls/${callId}/answerCandidates`);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("[WebRTC] Answer ICE candidate found");
          push(answerCandidatesRef, event.candidate.toJSON());
        }
      };

      console.log("[Action] Setting remote offer description");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      
      const answerDescription = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answerDescription);
      console.log("[Action] Answer created and set as local description");

      await update(callRef, {
        answer: { type: answerDescription.type, sdp: answerDescription.sdp },
        status: "active"
      });
      console.log("[Firebase] Call status updated to ACTIVE");

      onChildAdded(offerCandidatesRef, (snapshot) => {
        console.log("[WebRTC] Adding remote ICE candidate (from offer)");
        const candidate = new RTCIceCandidate(snapshot.val());
        peerConnection.addIceCandidate(candidate).catch(e => console.error("ICE Error:", e));
      });

    } catch (err) {
      console.error("[Error] Error in answerCall:", err);
      cleanupCall("Error in answerCall");
    }
  };

  const endCall = async () => {
    console.log("[Action] Ending call manually");
    if (currentCallIdRef.current) {
      const callRef = ref(db, `calls/${currentCallIdRef.current}`);
      await update(callRef, { status: "ended" });
      setTimeout(() => { remove(callRef).catch(() => {}); }, 1500);
    }
    cleanupCall("User clicked end call");
  };

  const toggleMic = () => {
    if (localStream) {
      const track = localStream.getAudioTracks()[0];
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
      console.log(`[Action] Microphone ${track.enabled ? "Enabled" : "Muted"}`);
    }
  };

  // Status & User list
  useEffect(() => {
    if (!user) return;
    const userStatusRef = ref(db, `db/status/${user.uid}`);
    onValue(ref(db, ".info/connected"), (snap) => {
      if (snap.val() === true) {
        set(userStatusRef, { uid: user.uid, state: "online", last_changed: serverTimestamp(), displayName: user.displayName, photo: user.photoURL });
        onDisconnect(userStatusRef).update({ state: "offline", last_changed: serverTimestamp() });
      }
    });
    onValue(ref(db, "db/status"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAllUsers(Object.keys(data).map(key => ({ uid: key, ...data[key] })));
      }
    });
  }, [user]);

  // Messages logic
  useEffect(() => {
    if (!user) return;
    const chatsRef = ref(db, `db/chats`);
    return onValue(chatsRef, (snapshot) => {
      const allChats = snapshot.val() || {};
      const newCounts = {};
      let total = 0;
      Object.keys(allChats).forEach(chatId => {
        if (chatId.includes(user.uid)) {
          const chatMessages = allChats[chatId];
          const msgIds = Object.keys(chatMessages);
          const otherUserId = chatId.replace(user.uid, "").replace("_", "");
          const lastReadId = localStorage.getItem(`lastRead_${chatId}`);
          let chatUnreadCount = 0;
          msgIds.forEach(id => {
            if (chatMessages[id].senderId !== user.uid && (!lastReadId || id > lastReadId)) chatUnreadCount++;
          });
          if (chatUnreadCount > 0) {
            newCounts[otherUserId] = chatUnreadCount;
            total += chatUnreadCount;
          }
        }
      });
      setUnreadCounts(newCounts);
      setTotalUnread(total);
    });
  }, [user]);

  useEffect(() => {
    if (!user || !selectedUser) { setMessages([]); return; }
    const combinedId = user.uid > selectedUser.uid ? `${user.uid}_${selectedUser.uid}` : `${selectedUser.uid}_${user.uid}`;
    return onValue(ref(db, `db/chats/${combinedId}`), (snapshot) => {
      const data = snapshot.val();
      if (data) localStorage.setItem(`lastRead_${combinedId}`, Object.keys(data)[Object.keys(data).length - 1]);
      setMessages(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });
  }, [user, selectedUser?.uid]);

  const login = async () => await signInWithPopup(auth, googleProvider);

  const sendMessage = async () => {
    if (!message.trim() || !user || !selectedUser) return;
    const combinedId = user.uid > selectedUser.uid ? `${user.uid}_${selectedUser.uid}` : `${selectedUser.uid}_${user.uid}`;
    const newMsgRef = push(ref(db, `db/chats/${combinedId}`));
    await set(newMsgRef, { text: message, timestamp: serverTimestamp(), senderId: user.uid, displayName: user.displayName });
    setMessage("");
    audioRef.current?.play().catch(() => {});
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black bg-[#F3F4F6] text-gray-400 italic uppercase tracking-widest">Բեռնվում է...</div>;

  return (
    <div className="flex flex-col h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      
      {/* CALL UI */}
      {isCalling && (
        <div className="fixed inset-0 z-[150] bg-gray-900 flex flex-col items-center justify-center p-4">
          <div className="w-full max-sm flex flex-col items-center text-center">
            <div className="relative mb-8">
              <img 
                src={(user?.uid === currentCallIdRef.current ? (incomingCall?.targetPhoto || selectedUser?.photo) : (incomingCall?.callerPhoto || selectedUser?.photo)) || "https://stonemarket.am/images/user.svg"} 
                className="w-32 h-32 rounded-full border-4 border-emerald-500 p-1 object-cover" 
                alt="" 
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg tracking-widest animate-pulse">
                {isTimerActive ? "In Call" : "Calling..."}
              </div>
            </div>
            <h2 className="text-white text-2xl font-black mb-2">
              {user?.uid === currentCallIdRef.current ? (incomingCall?.targetName || selectedUser?.displayName) : (incomingCall?.callerName || selectedUser?.displayName)}
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xl mb-12">
              <Clock size={20} />
              {isTimerActive ? formatTime(callDuration) : "Connecting..."}
            </div>
            {remoteStream && <audio autoPlay ref={a => { if (a) a.srcObject = remoteStream }} />}
            <div className="flex gap-6">
              <button onClick={toggleMic} className={`p-6 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
              </button>
              <button onClick={endCall} className="p-6 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all">
                <PhoneOff size={28} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INCOMING CALL NOTIFICATION */}
      {incomingCall && !isCalling && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-white shadow-2xl rounded-[2.5rem] p-6 flex items-center gap-6 border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-500 w-[90%] max-w-md">
          <img src={incomingCall.callerPhoto || "https://stonemarket.am/images/user.svg"} className="w-14 h-14 rounded-full object-cover" alt="" />
          <div className="flex-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Incoming Call</p>
            <h3 className="font-black text-gray-800">{incomingCall.callerName}</h3>
          </div>
          <div className="flex gap-3">
            <button onClick={answerCall} className="p-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 shadow-lg shadow-emerald-200"><Phone size={24} /></button>
            <button onClick={endCall} className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg shadow-red-200"><PhoneOff size={24} /></button>
          </div>
        </div>
      )}

      {/* CHAT INTERFACE */}
      <main className="flex-1 overflow-hidden flex flex-col h-full">
        {!user ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <button onClick={login} className="py-4 px-8 bg-gray-900 text-white rounded-2xl font-bold">Մուտք Google-ով</button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 h-full overflow-hidden">
            <div className="flex w-full max-w-[98%] 2xl:max-w-[1600px] h-full bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden">
              <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] lg:w-[420px] border-r border-gray-100 flex-col bg-white shrink-0`}>
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="font-black text-xl text-gray-800">Messages</h2>
                  <button onClick={() => signOut(auth)} className="p-2 text-gray-400 hover:text-red-500"><LogOut size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {allUsers.filter(u => u.uid !== user.uid).map((u) => (
                    <button key={u.uid} onClick={() => setSelectedUser(u)} className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${selectedUser?.uid === u.uid ? "bg-emerald-50" : "hover:bg-gray-50"}`}>
                      <img src={u.photo || "https://stonemarket.am/images/user.svg"} className="w-12 h-12 rounded-full object-cover" alt="" />
                      <div className="text-left flex-1 truncate">
                        <p className="font-bold text-gray-800 text-sm truncate">{u.displayName}</p>
                        <p className={`text-[10px] font-black uppercase ${u.state === 'online' ? 'text-green-500' : 'text-gray-400'}`}>{u.state}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#F9FAFB] h-full`}>
                {selectedUser ? (
                  <>
                    <header className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedUser(null)} className="md:hidden"><ChevronLeft size={28} /></button>
                        <img src={selectedUser.photo} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                          <h3 className="font-black text-gray-900 text-sm">{selectedUser.displayName}</h3>
                          <p className="text-[10px] text-green-500 font-bold uppercase">{selectedUser.state}</p>
                        </div>
                      </div>
                      <button onClick={startCall} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-full"><Phone size={22} /></button>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}>
                          <div className={`px-5 py-3 rounded-[1.75rem] max-w-[80%] ${msg.senderId === user.uid ? "bg-gray-900 text-white" : "bg-white text-gray-800 border"}`}>
                            <p className="text-sm font-medium">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </main>
                    <footer className="p-6 bg-white">
                      <div className="flex items-center gap-4 bg-gray-100 rounded-[2rem] px-6 py-3">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 bg-transparent border-none py-3 focus:outline-none" placeholder="Գրեք հաղորդագրություն..." />
                        <button onClick={sendMessage} className="p-3 bg-emerald-500 text-white rounded-2xl"><Send size={22} /></button>
                      </div>
                    </footer>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-300 uppercase font-black text-xs tracking-widest italic">Ընտրեք որևէ մեկին խոսակցություն սկսելու համար</div>
                )}
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}