import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "visionestate-ac254.firebaseapp.com",
  projectId: "visionestate-ac254",
  storageBucket: "visionestate-ac254.appspot.com",
  messagingSenderId: "1092956716654",
  appId: "1:1092956716654:web:f08bd526a16a450b28f07f",
};

export const app = initializeApp(firebaseConfig);
