import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDu_hEsypDSCaC4d52ZUNYH8IG7sLrBaww",
    authDomain: "recipe-project-58ad7.firebaseapp.com",
    projectId: "recipe-project-58ad7",
    storageBucket: "recipe-project-58ad7.appspot.com",
    messagingSenderId: "640300221963",
    appId: "1:640300221963:web:eb5b158c2fb5d0d073290e",
    measurementId: "G-Z6WEVWCFEB"
  };
  
  
  // const analytics = getAnalytics(app);

  firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);