import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCUQYP1fzji-qcOOGS_bltL4dDrj9R3-ns",
    authDomain: "whatsapp-clone-cf2f3.firebaseapp.com",
    projectId: "whatsapp-clone-cf2f3",
    storageBucket: "whatsapp-clone-cf2f3.appspot.com",
    messagingSenderId: "743261708198",
    appId: "1:743261708198:web:1f50f29dfe147646e47967"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db