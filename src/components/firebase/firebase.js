import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAudMj7cwvN9vz-D6Z6qboEXfwGhJBl11s",
  authDomain: "ak-foundation-5adbb.firebaseapp.com",
  projectId: "ak-foundation-5adbb",
  storageBucket: "ak-foundation-5adbb.appspot.com",
  messagingSenderId: "399710155235",
  appId: "1:399710155235:web:ac9ab59fbffb88b537f0d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
