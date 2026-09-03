import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7OIF-dnrsre_YaDVuWjw527whdmaSoi0",
  authDomain: "pgy-omts.firebaseapp.com",
  databaseURL: "https://pgy-omts-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pgy-omts",
  storageBucket: "pgy-omts.firebasestorage.app",
  messagingSenderId: "388216837936",
  appId: "1:388216837936:web:bd346048b18f5313fc5af5",
};

// Initialize Firebase only in browser environment
export const app = typeof window !== 'undefined'
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  if (!auth) return Promise.reject(new Error('Firebase not initialized'));
  return signInWithPopup(auth, googleProvider);
};

export const loginWithEmail = (email, password) => {
  if (!auth) return Promise.reject(new Error('Firebase not initialized'));
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  if (!auth) return Promise.reject(new Error('Firebase not initialized'));
  return signOut(auth);
};

// Allowed developer emails for accessing dev-notes
export const ALLOWED_DEV_EMAILS = [
  'crazyhorsebeh@gmail.com',
  'rndpgy@gmail.com',
];

export const isDevAuthorized = (user) => {
  if (!user || !user.email) return false;
  return ALLOWED_DEV_EMAILS.includes(user.email.toLowerCase().trim());
};

export { onAuthStateChanged };
