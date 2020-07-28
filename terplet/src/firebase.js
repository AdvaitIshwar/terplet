import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBe9W6MCRCdw4eYiQngb2qdbN-cSuPLNcc",
    authDomain: "terplet.firebaseapp.com",
    databaseURL: "https://terplet.firebaseio.com",
    projectId: "terplet",
    storageBucket: "terplet.appspot.com",
    messagingSenderId: "579665324726",
    appId: "1:579665324726:web:f878a047ab677a9fcad417",
    measurementId: "G-KNHFS5SWPM"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };