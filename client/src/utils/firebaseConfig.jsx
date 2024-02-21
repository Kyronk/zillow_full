// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBK8p2gMqRYMl3Z0IQ4QfjIs6JL-DY1PlE",
//     authDomain: "zillow-d9362.firebaseapp.com",
//     projectId: "zillow-d9362",
//     storageBucket: "zillow-d9362.appspot.com",
//     messagingSenderId: "734637803471",
//     appId: "1:734637803471:web:8efb10202dbd4baca7f4ba"
// };


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
    appId: import.meta.envVITE_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;