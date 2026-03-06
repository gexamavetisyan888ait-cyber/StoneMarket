// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const db = getDatabase(app);