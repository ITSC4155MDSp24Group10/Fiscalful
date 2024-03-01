// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoArWpWpqwduZx7azhBAqnkMZD1Xgf7Oo",
  authDomain: "fiscalful-50f5b.firebaseapp.com",
  projectId: "fiscalful-50f5b",
  storageBucket: "fiscalful-50f5b.appspot.com",
  messagingSenderId: "34619204235",
  appId: "1:34619204235:web:78eeac4527b797fcb0aa8e",
  measurementId: "G-BPX7MGRETF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

//Exports
export { app, firestore, auth, database };
export default app;