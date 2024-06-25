import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBZzKOhkHoZYFAjIH14KC1wsJoxvzTklbg",
  authDomain: "ai-generate-content-engine.firebaseapp.com",
  projectId: "ai-generate-content-engine",
  storageBucket: "ai-generate-content-engine.appspot.com",
  messagingSenderId: "1002545482102",
  appId: "1:1002545482102:web:7805fc791d18a7df225257",
  measurementId: "G-LERX09YMWG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

