// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB0PP_snEbLNhHbonNxNIIuSCog_m_n34A", //Firebase Project API KEY
	authDomain: "twitter-bcf24.firebaseapp.com", //Firebase Project authDomain
	projectId: "twitter-bcf24", //Firebase Project project ID
	storageBucket: "twitter-bcf24.appspot.com", //Firebase Project storage Bucket
	messagingSenderId: "343556644328", //Firebase Project message sender id
	appId: "1:343556644328:web:62c27b357c09a37035985d", //Firebase Project app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default dataBase;
