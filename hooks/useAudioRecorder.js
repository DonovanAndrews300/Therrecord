import { useState, useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

const useAudioRecorder =  () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);

  useEffect(() => {
    return recording
      ? () => {
        recording.stopAndUnloadAsync();
      }
      : undefined;
  }, [recording]);

  const handleStartStop = async () => {
    if (isRecording) {
      await pauseRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Permission to access microphone is required!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      if (recording) {
        await recording.startAsync();
      } else {
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(newRecording);
      }
      setIsRecording(true);
      console.log('Recording started or resumed');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const pauseRecording = async () => {
    if (recording) {
      await recording.pauseAsync();
      setIsRecording(false);
      console.log('Recording paused');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      if(isRecording){
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
      }
      const audioUri = recording.getURI();
      setUri(audioUri);
      setRecording(null);recording.getURI()
      setIsRecording(false);
      console.log('Recording stopped and stored at', audioUri);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return {
    isRecording,
    uri,
    handleStartStop,
    stopRecording,
  };
};

export default useAudioRecorder;
