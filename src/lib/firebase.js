// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Ավելացված է

const firebaseConfig = {
  apiKey: "AIzaSyDGCOksd0BiEQgOhXUXTdgrxz55NJxm0mI",
  authDomain: "stonemarket-7f764.firebaseapp.com",
  databaseURL: "https://stonemarket-7f764-default-rtdb.firebaseio.com",
  projectId: "stonemarket-7f764",
  storageBucket: "stonemarket-7f764.firebasestorage.app",
  messagingSenderId: "544977633052",
  appId: "1:544977633052:web:ccc76b682eed8563b8c4d9",
  measurementId: "G-BGKF4XMEXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Էքսպորտ ենք անում բոլոր անհրաժեշտ մոդուլները
export const db = getDatabase(app);
export const auth = getAuth(app); // Ավելացված է
export const googleProvider = new GoogleAuthProvider(); // Ավելացված է