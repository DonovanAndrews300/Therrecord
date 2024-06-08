// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClANVhrYVpZxHtw7d6wnkA98t4aKFYwJk",
  authDomain: "therrecord.firebaseapp.com",
  projectId: "therrecord",
  storageBucket: "therrecord.appspot.com",
  messagingSenderId: "825878563821",
  appId: "1:825878563821:web:6da69c9202e292cf3275e4",
  measurementId: "G-7FY9LTF4Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };