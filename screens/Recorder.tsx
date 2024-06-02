import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartStop = () => {
    setIsRecording(!isRecording);
  };


  return (
    <View style={styles.container}>
      <View style={styles.buttonBar}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={isRecording ? 'pause' : 'play'}
            size={30}
            onPress={handleStartStop}
            style={styles.iconButton}
          />
          <Text style={styles.buttonLabel}>{isRecording ? 'Pause' : 'Start'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="emoticon-happy-outline"
            size={30}
            onPress={() => {}}
            style={styles.iconButton}
          />
          <Text style={styles.buttonLabel}>Emote</Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="square"
            size={30}
            style={styles.iconButton}
          />
          <Text style={styles.buttonLabel}>End</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  recordButton: {
    marginTop: 100,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
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


