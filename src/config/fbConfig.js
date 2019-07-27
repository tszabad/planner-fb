import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const config = {
  apiKey: "AIzaSyAGSZglb_diWCE_O7bhILDph0pU6iOUZdo",
  authDomain: "tom-planer.firebaseapp.com",
  databaseURL: "https://tom-planer.firebaseio.com",
  projectId: "tom-planer",
  storageBucket: "tom-planer.appspot.com",
  messagingSenderId: "308742567356",
  appId: "1:308742567356:web:4635d76be890bda1"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 