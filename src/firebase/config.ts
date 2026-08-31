import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Embedded fallback config for production deployments (e.g. Vercel)
const fallbackConfig = {
  projectId: "project-51be26c5-fa4b-4783-9fe",
  appId: "1:356440421705:web:887a2f6c811ecaedc29698",
  apiKey: "AIzaSyBQdsmbvy_1d6qgiFuFjH3rr2jr0x7EMqw",
  authDomain: "project-51be26c5-fa4b-4783-9fe.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-c1b4c149-753f-4ca1-90a4-ca0df8bf7571",
  storageBucket: "project-51be26c5-fa4b-4783-9fe.firebasestorage.app",
  messagingSenderId: "356440421705"
};

const configModules = import.meta.glob<{ default: Record<string, string> }>('../../*firebase-applet-config*.json', { eager: true });
const globJson = (Object.values(configModules)[0] as any)?.default || {};

const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || globJson.apiKey || fallbackConfig.apiKey,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || globJson.authDomain || fallbackConfig.authDomain,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || globJson.projectId || fallbackConfig.projectId,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || globJson.storageBucket || fallbackConfig.storageBucket,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || globJson.messagingSenderId || fallbackConfig.messagingSenderId,
  appId: metaEnv.VITE_FIREBASE_APP_ID || globJson.appId || fallbackConfig.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
const dbId = metaEnv.VITE_FIREBASE_DATABASE_ID || globJson.firestoreDatabaseId || fallbackConfig.firestoreDatabaseId;
export const db = dbId && dbId !== '(default)'
  ? getFirestore(app, dbId)
  : getFirestore(app);

export default app;
