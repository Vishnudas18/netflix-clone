import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBHeHLSWWx3aX9lF89kjYjnVq-ZftMQWHA",
  authDomain: "netflix-clone-91ada.firebaseapp.com",
  projectId: "netflix-clone-91ada",
  storageBucket: "netflix-clone-91ada.appspot.com",
  messagingSenderId: "617887536007",
  appId: "1:617887536007:web:74653d681a85438700f922"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
     try {
      const res =  await createUserWithEmailAndPassword(auth, email, password );
      const user = res.user
      await addDoc (collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
     }
}

const login = async (email, password)=>{
    try {
         await signInWithEmailAndPassword(auth, email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut (auth);
}
export {auth, db, login, signup, logout}
