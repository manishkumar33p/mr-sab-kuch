import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_7BgqMvA5MNPca_F_MMycx8LW4_DBkWo",
  authDomain: "mr-sab-kuch.firebaseapp.com",
  projectId: "mr-sab-kuch",
  storageBucket: "mr-sab-kuch.firebasestorage.app",
  messagingSenderId: "227476156775",
  appId: "1:227476156775:web:bafedae80ab5faf20a3fc2",
  measurementId: "G-QX3Q5N91W4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
