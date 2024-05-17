// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCg6nrYGtXoKB1R0W-FFSnP78UbNORRqv4",
	authDomain: "fed23-study-planner.firebaseapp.com",
	projectId: "fed23-study-planner",
	storageBucket: "fed23-study-planner.appspot.com",
	messagingSenderId: "98672128723",
	appId: "1:98672128723:web:f5e64fb208223bcc2f5a26",
	measurementId: "G-PZFDFEMW3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };