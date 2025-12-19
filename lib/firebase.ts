
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Helper to safely get env vars in different environments (Vite/CRA/Browser)
const getEnv = (key: string, fallback: string) => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      // @ts-ignore
      return process.env[key];
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // Ignore errors if process or import.meta are not defined
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv("REACT_APP_FIREBASE_API_KEY", "AIzaSyDrMcXQN7CyS3B9H5yPA0shsjG5ChH7J0s"),
  authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN", "voiceit-52f9a.firebaseapp.com"),
  projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID", "voiceit-52f9a"),
  storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET", "voiceit-52f9a.firebasestorage.app"),
  messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID", "691004655470"),
  appId: getEnv("REACT_APP_FIREBASE_APP_ID", "1:691004655470:web:a893abbf6704fade1da37f"),
  measurementId: getEnv("REACT_APP_FIREBASE_MEASUREMENT_ID", "G-SXDQPG40QJ")
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use initializeFirestore with experimentalForceLongPolling to fix "Could not reach Cloud Firestore backend"
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Analytics can fail in some environments (like server-side rendering or non-browser), so we wrap it
let analytics;
if (typeof window !== "undefined") {
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        // Suppress circular error warnings from analytics initialization in offline mode
        console.debug("Firebase Analytics skipped:", e);
    }
}

export { app, auth, db, analytics };
