import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// ///////////////////////
// import {
//     GoogleAuthProvider,
//     getAuth,
//     signInWithPopup,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     sendPasswordResetEmail,
//     signOut,
// } from "firebase/compat/auth";
// import {
//     getFirestore,
//     query,
//     getDocs,
//     collection,
//     where,
//     addDoc,
// } from "firebase/compat/firestore";
// ///////////////////////

const firebaseConfig = {
    apiKey: "AIzaSyCxjOs71scifWp2Ya9IpDghfZJsOT2qV0c",
    authDomain: "financeiro-adm-development.firebaseapp.com",
    projectId: "financeiro-adm-development",
    storageBucket: "financeiro-adm-development.appspot.com",
    messagingSenderId: "13289750931",
    appId: "1:13289750931:web:dc380d7b6fb8359d86e866",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const auth = app.auth();
// export const db = getFirestore(app);
export const auth = firebase.auth();
export const db = firebase.firestore();
