// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw8rKHk4IjAGHEZyBg5kgFepwheapK7zk",
  authDomain: "library-60e1f.firebaseapp.com",
  projectId: "library-60e1f",
  storageBucket: "library-60e1f.appspot.com",
  messagingSenderId: "1020228335320",
  appId: "1:1020228335320:web:b5e1dcd38ba02216ac49ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

