// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "", //Firebase Project API KEY
	authDomain: "", //Firebase Project authDomain
	projectId: "", //Firebase Project project ID
	storageBucket: "", //Firebase Project storage Bucket
	messagingSenderId: "", //Firebase Project message sender id
	appId: "", //Firebase Project app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default dataBase;
