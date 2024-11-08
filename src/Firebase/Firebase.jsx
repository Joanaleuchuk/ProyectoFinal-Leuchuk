import { initializeApp } from "firebase/app";
import {getFirestore}from "firebase/firestore"
import {getAuth }from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDTVcRAfwSnyrRLfkBC3RjtzW2M5VaviuQ",
  authDomain: "la-masconeta.firebaseapp.com",
  projectId: "la-masconeta",
  storageBucket: "la-masconeta.firebasestorage.app",
  messagingSenderId: "555176672184",
  appId: "1:555176672184:web:c214182f54bf5880252d4d",
  measurementId: "G-ZK603NSV75"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const auth= getAuth(app);

export default app;