import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, MessagePayload, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export async function requestFCMToken() {
  if (!messaging) return null;
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (error) {
    console.error("Failed to get FCM token", error);
    return null;
  }
}

export function onFCMMessage(callback: (payload: any) => void) {
  if (!messaging) return () => {};
  return onMessage(messaging, callback);
}
