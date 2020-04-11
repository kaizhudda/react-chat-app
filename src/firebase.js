import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCrJmtfNZkfUMTFa5gjr7f8IVf-RTbaqeo",
  authDomain: "react-slack-2520f.firebaseapp.com",
  databaseURL: "https://react-slack-2520f.firebaseio.com",
  projectId: "react-slack-2520f",
  storageBucket: "react-slack-2520f.appspot.com",
  messagingSenderId: "56130184040",
  appId: "1:56130184040:web:8e4fc3b77b6ee395d76cdd",
  measurementId: "G-5VH2MKSX94",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
