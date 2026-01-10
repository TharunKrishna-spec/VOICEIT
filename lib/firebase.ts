
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Env var lookup with safe browser fallbacks
const getEnv = (key: string, fallback: string) => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) return import.meta.env[key];
  } catch (e) {}
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

// Use Long Polling to bypass corporate firewalls/proxies and fix "Could not reach backend"
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false // More stable for simple environments
});

let analytics;
if (typeof window !== "undefined") {
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        console.debug("Analytics skipped in this environment");
    }
}

export { app, auth, db, analytics };
