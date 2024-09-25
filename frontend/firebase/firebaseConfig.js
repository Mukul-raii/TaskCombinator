
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBuud9CP8jm5smIhHoZRH76SGWjJmlKTck",
  authDomain: "taskcombinator.firebaseapp.com",
  projectId: "taskcombinator",
  storageBucket: "taskcombinator.appspot.com",
  messagingSenderId: "250029565922",
  appId: "1:250029565922:web:4b3850bfb7733aeb0ebbbb",
  measurementId: "G-XMG8VHM09S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth =getAuth(app)
export default app