// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyA7CAEmbuGycp_xvkvniCbB_8bDv11vrvw",
  authDomain: "whatsapp-clone-58381.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-58381.firebaseio.com",
  projectId: "whatsapp-clone-58381",
  storageBucket: "whatsapp-clone-58381.appspot.com",
  messagingSenderId: "48125483423",
  appId: "1:48125483423:web:77fde572255988880e45aa",
  measurementId: "G-RX76EZX89Y"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const usersColl = db.collection('Users');
export {auth,provider};
export default db;
