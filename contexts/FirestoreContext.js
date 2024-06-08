import React , {createContext, useContext, useState, useEffect} from 'react';
import { firestore } from '../firebaseConfig'
import {collection, getDocs, addDoc} from 'firebase/firestore';

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);

    const getUserData = (userData) =>{};

    return (
        <FirestoreContext.Provider value={{userData}}>
            {children}
        </FirestoreContext.Provider>
    )
}