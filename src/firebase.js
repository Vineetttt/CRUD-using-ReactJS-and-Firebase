import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCxUjJJ7PFo-aMhbXb9SqNNn3rMi3sQo00",
    authDomain: "crud-operations-7b6b7.firebaseapp.com",
    projectId: "crud-operations-7b6b7",
    storageBucket: "crud-operations-7b6b7.appspot.com",
    messagingSenderId: "479264283904",
    appId: "1:479264283904:web:ef2dd8aaff7afe623ee7e5",
    measurementId: "G-QS361MQH8M"
  };

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();