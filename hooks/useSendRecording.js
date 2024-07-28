import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';




async function testAudioFile(uri) {
  try {
    // Load the audio file using Expo's Audio API
    const { sound, status } = await Audio.Sound.createAsync({ uri });

    // Check if the audio data is valid and complete
    if (status.isLoaded && status.durationMillis > 0) {
      return {
        isValid: true,
        duration: status.durationMillis / 1000, // Convert milliseconds to seconds
        numberOfChannels: status.audioChannelCount,
        sampleRate: status.sampleRate,
      };
    } else {
      throw new Error('The audio file is invalid or incomplete.');
    }
  } catch (error) {
    console.error('An error occurred while loading the audio file:', error);
    return {
      isValid: false,
      error: error.message,
    };
  }
}

// Example usage:

const useSendRecording = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  const {addAudioSession} = useFirestore();
  const sendRecording = async (uri) => {
    setIsLoading(true);
    setError(null);

    try {

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist.');
      }
      
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/[:\-T.]/g, '').slice(0, 14); // Format as YYYYMMDDHHMMSS
      const randomNum = Math.floor(Math.random() * 1000000);

      const filename = `${formattedDate}_${randomNum}.m4a`;      
      const formData = new FormData();

      formData.append('file', {
        uri: uri,
        name: filename,
        type: 'audio/x-m4a',
      });
      formData.append('filename', filename);
  

      const response = await fetch('http://10.0.0.105:5000/uploadAudio', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log(user);
      const audioSession = {
        user_id: user.uid,
        file_name: filename,
        url: data.recordingUrl,
        uploaded_at: currentDate.getTime(),
      };

      addAudioSession(audioSession);
 

      if (!response.ok) {
        throw new Error('Chunk upload failed');
      }
      
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRecording };
};

export default useSendRecording;
