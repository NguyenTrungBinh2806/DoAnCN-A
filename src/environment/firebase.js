// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firestore library
import { getFirestore } from "firebase/firestore";
// import auth library
import { getAuth } from "firebase/auth";
// import storage library
import { getStorage } from "firebase/storage";
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
  // apiKey: "AIzaSyBhCWQ1Xbx5cui8XZ_mbiQUnejqa67Vvyo",
  // authDomain: "doana-2231.firebaseapp.com",
  // projectId: "doana-2231",
  // storageBucket: "doana-2231.appspot.com",
  // messagingSenderId: "874168448874",
  // appId: "1:874168448874:web:88c0ba070df42812a09713",
  // measurementId: "G-LFRGMYXBKK"

  // MAi Vy
  // apiKey: "AIzaSyDrp7l5zlyoiEO2ryHWbNoDczdrwsXVvzo",
  // authDomain: "doancv-2231.firebaseapp.com",
  // projectId: "doancv-2231",
  // storageBucket: "doancv-2231.appspot.com",
  // messagingSenderId: "620393564465",
  // appId: "1:620393564465:web:8c2f8e80f12b69e0dec810"

  // Main database
  apiKey: "AIzaSyAs5saLaiqefGqe7EBV1_0MgOXG-obQlMs",
  authDomain: "dacn-a-2231.firebaseapp.com",
  projectId: "dacn-a-2231",
  storageBucket: "dacn-a-2231.appspot.com",
  messagingSenderId: "711781498507",
  appId: "1:711781498507:web:80b148a73d2321aff11e8e",
  measurementId: "G-YJ9EV26JD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firestore
const db = getFirestore(app);
// Initialize auth
const auth = getAuth(app);
// Initialize storage
const storage = getStorage(app);

export default db;
export { auth, storage };
