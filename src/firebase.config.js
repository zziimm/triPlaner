// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FRIEKEY}`,
  authDomain: `${process.env.REACT_APP_DOMAIN}`,
  projectId: `${process.env.REACT_APP_ID}`,
  storageBucket: `${process.env.REACT_APP_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_SENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// export const db = getDatabase(app);
export const db = getFirestore(app);