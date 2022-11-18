// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firestore library
import { getFirestore } from "firebase/firestore";
// import auth library
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  // nguyenbinh2806

  // apiKey: "AIzaSyAOsdmzD3ZtNeKWhcdacjL7KesGgS_I29M",
  // authDomain: "doana-2131.firebaseapp.com",
  // databaseURL: "https://doana-2131-default-rtdb.firebaseio.com",
  // projectId: "doana-2131",
  // storageBucket: "doana-2131.appspot.com",
  // messagingSenderId: "863700679432",
  // appId: "1:863700679432:web:cace00e534b56b99b88abd"

  // Mail SV
  apiKey: "AIzaSyBhCWQ1Xbx5cui8XZ_mbiQUnejqa67Vvyo",
  authDomain: "doana-2231.firebaseapp.com",
  projectId: "doana-2231",
  storageBucket: "doana-2231.appspot.com",
  messagingSenderId: "874168448874",
  appId: "1:874168448874:web:88c0ba070df42812a09713",
  measurementId: "G-LFRGMYXBKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firestore
const db = getFirestore(app);
// Initialize auth
const auth = getAuth(app);

export default db;
export { auth };
