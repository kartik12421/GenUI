// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genui-b6061.firebaseapp.com",
  projectId: "genui-b6061",
  storageBucket: "genui-b6061.firebasestorage.app",
  messagingSenderId: "628640272812",
  appId: "1:628640272812:web:247af77470240916fe2a09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}
