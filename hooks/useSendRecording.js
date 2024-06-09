import {useState , useEffect } from 'react';

export default useSendRecording = async (uri) => {
    try{
    const [isLoading, setIsLoading] = useState(false);
    setIsLoading(true);
    const fileResponse = await fetch(uri);
    const blob = await fileResponse.blob();

    const formData = new FormData();
    formData.append('file', blob, 'session.mp3');

    //where server call to cloud function will be made for processing before being stored
    serverResponse = await fetch('', {
        method: 'POST',
        body: formData
    });
    setIsLoading(false);
    }
  
    catch (error) {
        console.error(`error sending file:${error.message}`);
    }
}