import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import {auth} from '../../firebaseConfig';



export const signInUser = async (email, password) => {
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(err){
    alert(`Login failed:${err.message}`);
  } 
};

export const signUpUser = async  (email,password,confirmPassword) => {
  try{
    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return; // Early return if the passwords do not match
    }
    await createUserWithEmailAndPassword(auth,email,password);
  }
  catch (err) {
    alert(`There was an error with registration ${err.message}`);
  }
};