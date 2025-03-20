// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPoCd4aCZM5E4vxZQc4gIoEW2w0NkAf1w",
  authDomain: "market-place-js4.firebaseapp.com",
  projectId: "market-place-js4",
  storageBucket: "market-place-js4.firebasestorage.app",
  messagingSenderId: "345132533768",
  appId: "1:345132533768:web:6688cebe0c2ecc374ee9bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
