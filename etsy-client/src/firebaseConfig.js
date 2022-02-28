import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDekRefURk9lKVdYaVQOiGikSgHZ4IeHLk",
    authDomain: "etsy-52dc7.firebaseapp.com",
    projectId: "etsy-52dc7",
    storageBucket: "etsy-52dc7.appspot.com",
    messagingSenderId: "212544916709",
    appId: "1:212544916709:web:65cc1edbedc03ba4c8180c",
    measurementId: "G-1EJGBB513H"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export default firebaseApp;