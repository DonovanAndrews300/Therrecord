import {useState , useEffect } from 'react';
import { Audio } from 'expo-av';

export default useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useEffect(null);
    const [uri, setUri] = useEffect(null);

    useEffect(() => {
        return recording 
        ? () => {
            recording.stopAndUnloadAsync();
        }
        : undefined;
    }, [recording]);

    const handleStartStop = async () => {
        if(isRecording) {
            stopRecording(recording);
    }
    else{
        startRecording();
    }
}
    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if(permission.status !== 'granted') {
                alert("permission to access microphone is required!");
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            console.log("recoridng started")
        } catch (error) {
            console.error('Failed to start recording', err);

        }
    };
    const stopRecording = async () => {
        await recording.stopAndUnloadAsync();
        const uri = recording.getUri();
        setUri(uri);
        setRecording(null);
        setIsRecording(false);
    };
    return {
        isRecording,
        uri,
        handleStartStop,
    }
}