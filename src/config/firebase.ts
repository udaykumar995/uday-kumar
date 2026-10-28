import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const LOCAL_STORAGE_KEY = 'viralreels_firebase_custom_config';

/**
 * Retrieves the current Firebase configuration from Vite environment variables
 * or custom local overrides saved via the in-app settings
 */
export function getFirebaseConfig(): FirebaseConfig | null {
  // Check localStorage for mobile user override first
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch {
    // Ignore JSON parse errors
  }

  // Fallback to Vite env variables
  const envConfig: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  return null;
}

export function saveCustomFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
}

export function clearCustomFirebaseConfig(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;

export function initializeFirebase(): { app: FirebaseApp | null; auth: Auth | null; isConfigured: boolean } {
  const config = getFirebaseConfig();

  if (!config || !config.apiKey || !config.projectId) {
    return { app: null, auth: null, isConfigured: false };
  }

  try {
    if (!getApps().length) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }
    authInstance = getAuth(appInstance);
    return { app: appInstance, auth: authInstance, isConfigured: true };
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
    return { app: null, auth: null, isConfigured: false };
  }
}
