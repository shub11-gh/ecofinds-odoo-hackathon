
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "ecofinds-aw8im",
  "appId": "1:57022818457:web:0b131c9f38a66350e07008",
  "storageBucket": "ecofinds-aw8im.firebasestorage.app",
  "apiKey": "AIzaSyBKJUAxgaJ6gtAEjNoOH1Os9I1mcviUmoY",
  "authDomain": "ecofinds-aw8im.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "57022818457"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
