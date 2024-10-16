import { initializeApp } from "firebase/app";
import {getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAE6OIug3z03OA4sbmbgMqcGB_d8QEAqSw",
  authDomain: "studentcrud-2df4d.firebaseapp.com",
  projectId: "studentcrud-2df4d",
  storageBucket: "studentcrud-2df4d.appspot.com",
  messagingSenderId: "768032747480",
  appId: "1:768032747480:web:b7a2ecb9ae2c3e2696ccad",
  measurementId: "G-ZEZ1T5VQXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

