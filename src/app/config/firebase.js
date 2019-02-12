import firebase from 'firebase';
import 'firebase/firestore';

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB8D3hoQK8FoRd5vHXmCWLlRs5neZfEcuY",
    authDomain: "smart-garden-3989d.firebaseapp.com",
    databaseURL: "https://smart-garden-3989d.firebaseio.com",
    projectId: "smart-garden-3989d",
    storageBucket: "smart-garden-3989d.appspot.com",
    messagingSenderId: "1091423080661"
  };
 
firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();
const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

export default firebase;