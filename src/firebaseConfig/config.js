import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBFcG3ko1JkEK9HThk-ztjL9Qhk3Xe6Df8",
  authDomain: "online-judge-4f4f3.firebaseapp.com",
  projectId: "online-judge-4f4f3",
  storageBucket: "online-judge-4f4f3.appspot.com",
  messagingSenderId: "434924274301",
  appId: "1:434924274301:web:70fa56ddfab34fe69e6714",
};

//Initialize Firebase
const fireConfig = firebase.initializeApp(firebaseConfig);

export default fireConfig;
