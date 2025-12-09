
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDrMcXQN7CyS3B9H5yPA0shsjG5ChH7J0s",
  authDomain: "voiceit-52f9a.firebaseapp.com",
  projectId: "voiceit-52f9a",
  storageBucket: "voiceit-52f9a.firebasestorage.app",
  messagingSenderId: "691004655470",
  appId: "1:691004655470:web:a893abbf6704fade1da37f",
  measurementId: "G-SXDQPG40QJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics can fail in some environments (like server-side rendering or non-browser), so we wrap it
let analytics;
if (typeof window !== "undefined") {
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        console.warn("Firebase Analytics failed to initialize", e);
    }
}

export { app, auth, db, analytics };
