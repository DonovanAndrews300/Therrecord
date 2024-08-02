import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, addDoc, doc, setDoc, getDoc, query, where, orderBy, startAfter, limit } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [userData] = useState([]);
  const [audioSessions, setAudioSessions] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10; // Adjust the page size as needed

  // Add a new user
  const addUser = async (user) => {
    try {
      const userRef = doc(firestore, 'users', user.id);
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
      const userRef = doc(firestore, 'users', userId);
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
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const audioSessionsRef = collection(firestore, 'audio_sessions');
      let q = query(
        audioSessionsRef,
        where('user_id', '==', userId),
        limit(PAGE_SIZE)
      );      

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);

      const sessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAudioSessions((prevSessions) => [...prevSessions, ...sessions]);

      if (querySnapshot.size < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      return sessions;
    } catch (error) {
      console.error('Error getting audio files: ', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirestoreContext.Provider value={{ addUser, addAudioSession, getUserData, getAudioSessions, userData, audioSessions, hasMore, loading }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
