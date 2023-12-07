// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw_wOisoFLuoYPEMod8aRt5wJTAqViG60",
  authDomain: "nextjs-830d4.firebaseapp.com",
  databaseURL: "https://nextjs-830d4-default-rtdb.firebaseio.com",
  projectId: "nextjs-830d4",
  storageBucket: "nextjs-830d4.appspot.com",
  messagingSenderId: "720284599425",
  appId: "1:720284599425:web:f6350f742ba5d8d97e3980",
  measurementId: "G-J7NW9XXL35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
