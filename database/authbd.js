// authbd.js
import firebase from "firebase/compat/app"; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyDD-L13hUiZEijmwqPFWDjukHfF-2kBdcI",
    authDomain: "udbvirtual-b9976.firebaseapp.com",
    projectId: "udbvirtual-b9976",
    storageBucket: "udbvirtual-b9976.appspot.com",
    messagingSenderId: "807110312225",
    appId: "1:807110312225:web:49428d6883da664addfe60"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebase, auth, provider };
