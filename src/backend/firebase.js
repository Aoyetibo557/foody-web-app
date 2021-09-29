import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAj0Dva8MUBTsYaOaplEFMMvsSORzsFZEw",
  authDomain: "temp-e9f21.firebaseapp.com",
  projectId: "temp-e9f21",
  storageBucket: "temp-e9f21.appspot.com",
  messagingSenderId: "598461863875",
  appId: "1:598461863875:web:2c2637f996619c44d9cf76",
  measurementId: "G-92NZK9566E"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, db, provider};