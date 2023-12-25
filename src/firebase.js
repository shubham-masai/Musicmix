// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "musicmix-38258.firebaseapp.com",
  projectId: "musicmix-38258",
  storageBucket: "musicmix-38258.appspot.com",
  messagingSenderId: "261922324044",
  appId: "1:261922324044:web:c0a3aa443de50ae4173ee9",
  measurementId: "G-PS65S17K89"
};
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);