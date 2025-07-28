// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHaAlRdzoAKkCFEtn3Nvy53sVt0OXCUkI",
    authDomain: "gamezy-c38f6.firebaseapp.com",
    projectId: "gamezy-c38f6",
    storageBucket: "gamezy-c38f6.firebasestorage.app",
    messagingSenderId: "404215319527",
    appId: "1:404215319527:web:0060ae306bcdcd3c270b42",
    measurementId: "G-4254FFMXNY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
