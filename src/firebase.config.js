// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbUhxz32cDK9js9OQURXOXbLj_Qx7oE1w",
  authDomain: "email-pass-auth-cfdf3.firebaseapp.com",
  projectId: "email-pass-auth-cfdf3",
  storageBucket: "email-pass-auth-cfdf3.appspot.com",
  messagingSenderId: "989027112676",
  appId: "1:989027112676:web:6328120491985817787ef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;