import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDlSGmdxf6ZAA7lihh2_g0UXxGg5PTVN2I",
    authDomain: "snapchat-clone-f9bc5.firebaseapp.com",
    projectId: "snapchat-clone-f9bc5",
    storageBucket: "snapchat-clone-f9bc5.appspot.com",
    messagingSenderId: "706918538905",
    appId: "1:706918538905:web:b55ac1a1bf31beb64ca208"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export  {db,auth,storage,provider};