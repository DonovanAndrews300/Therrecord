import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, addDoc, doc, setDoc, getDoc, query, where } from 'firebase/firestore';

import { firestore } from '../firebaseConfig';

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [userData] = useState([]);
  const [audioSessions, setAudioSessions] = useState([]);

  // Add a new user
  const addUser = async (user) => {
    try {
      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, user);
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  // Add a new audio file
  const addAudioSession = async (audioSession) => {
    try {
      const audioSessionsRef = collection(firestore, 'audio_sessions');
      await addDoc(audioSessionsRef, audioSession);
      console.log('Audio file added successfully');
    } catch (error) {
      console.error('Error adding audio file: ', error);
    }
  };

  // Get user data
  const getUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data: ', error);
      return null;
    }
  };

  // Get audio files for a user
  const getAudioSessions = async (userId) => {
    try {
      const audioSessionsRef = collection(db, 'audioSessions');
      const q = query(audioSessionsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const audioSessions = [];
      querySnapshot.forEach((doc) => {
        audioSessions.push(doc.data());
      });
      setAudioSessions(audioSessions);
    } catch (error) {
      console.error('Error getting audio files: ', error);
      return [];
    }
  };

  return (
    <FirestoreContext.Provider value={{ addUser, addAudioSession, getUserData, getAudioSessions, userData, audioSessions }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
