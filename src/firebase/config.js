import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBHxr3TOHZgtlv5IBla_pSIyjTIrlHmjRU",
    authDomain: "chaapp-3023d.firebaseapp.com",
    databaseURL: "https://chaapp-3023d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chaapp-3023d",
    storageBucket: "chaapp-3023d.appspot.com",
    messagingSenderId: "953156110265",
    appId: "1:953156110265:web:a2104891f27fd0e901d868",
    measurementId: "G-94560XR0XB"

  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db}
export default firebase
