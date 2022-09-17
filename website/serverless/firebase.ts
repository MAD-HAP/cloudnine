import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWOEM5HsOuUb2K4XYWbFysq39L0LNXJ54",
    authDomain: "mad-hap.firebaseapp.com",
    projectId: "mad-hap",
    storageBucket: "mad-hap.appspot.com",
    messagingSenderId: "575630723914",
    appId: "1:575630723914:web:15a96d9db8db7b9dff0fb3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, app, storage };
