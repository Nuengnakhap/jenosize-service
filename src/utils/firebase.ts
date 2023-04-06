// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqyRS2BWSxCaxN7QrGSBYIzSAfQLK1XNo",
  authDomain: "web-appz-prj.firebaseapp.com",
  databaseURL: "https://web-appz-prj.firebaseio.com",
  projectId: "web-appz-prj",
  storageBucket: "web-appz-prj.appspot.com",
  messagingSenderId: "453270434602",
  appId: "1:453270434602:web:1a1a08ef331a088bfc6453",
  measurementId: "G-8LPGMRQH6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firebase = { app, auth };

export default firebase;
