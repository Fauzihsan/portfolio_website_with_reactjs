import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKpNYCATVXzUlXs6OC4dlaVd99Y2CA4j8",
  authDomain: "journey-website-f9f7d.firebaseapp.com",
  projectId: "journey-website-f9f7d",
  storageBucket: "journey-website-f9f7d.appspot.com",
  messagingSenderId: "326418809932",
  appId: "1:326418809932:web:e82c2a60dee1e39016a0e9",
  measurementId: "G-PH5963VQTM",
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
