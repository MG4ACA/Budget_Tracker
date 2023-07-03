
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCn4HOqdeTOyMFqSe8CmayAAuFRcjp5e7s",
  authDomain: "budget-tracker-3ae8d.firebaseapp.com",
  projectId: "budget-tracker-3ae8d",
  storageBucket: "budget-tracker-3ae8d.appspot.com",
  messagingSenderId: "31388638151",
  appId: "1:31388638151:web:93896c675b35b26dce97e2",
  measurementId: "G-GXLP4KJQXE"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
