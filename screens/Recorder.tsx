import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import useAudioRecorder from '../hooks/useAudioRecorder';
import Logo from '../assets/icon.svg'; // Adjust the path according to your project structure
import useSendRecording from '../hooks/useSendRecording';

export const Recorder = ({navigation}) => {
  const theme = useTheme();
  const { sendRecording } = useSendRecording();
  const { uri, isRecording, handleStartStop, stopRecording } = useAudioRecorder();

  useEffect(() => {
    const endRecording = async () => {
      if (uri) {
        try {
          await sendRecording(uri);
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Error', 'Failed to send recording.');
        }
      }
    };

    endRecording();
  }, [uri]);

  const handleEndRecording = async () => {
    await stopRecording();
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        <Logo width={200} height={200} />
      </View>
      <View style={[styles.buttonBar, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={isRecording ? 'pause' : 'play'}
            size={30}
            onPress={handleStartStop}
            style={styles.iconButton}
            iconColor={theme.colors.primary}
          />
          <Text style={[styles.buttonLabel, { color: theme.colors.onSurface }]}>
            {isRecording ? 'Pause' : 'Start'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="square"
            size={30}
            style={styles.iconButton}
            iconColor={theme.colors.primary}
            onPress={handleEndRecording}
          />
          <Text style={[styles.buttonLabel, { color: theme.colors.onSurface }]}>
            End
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  buttonLabel: {
    marginTop: -10,
    fontSize: 12,
    textAlign: 'center',
  },
});
