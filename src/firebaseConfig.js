import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBiRMWaD3MSczTAExj-V_5sGP4-tdugobc",
    authDomain: "glorylandschools-aaf91.firebaseapp.com",
    projectId: "glorylandschools-aaf91",
    storageBucket: "glorylandschools-aaf91.firebasestorage.app",
    messagingSenderId: "515483662046",
    appId: "1:515483662046:web:27aad4fb453a465eeab44f",
    measurementId: "G-Q9YJ68X55N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
