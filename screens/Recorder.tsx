import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const theme = useTheme();  // Access the theme from context

  const handleStartStop = () => {
    setIsRecording(!isRecording);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            icon="emoticon-happy-outline"
            size={30}
            onPress={() => {}}
            style={styles.iconButton}
            iconColor={theme.colors.primary}
          />
          <Text style={[styles.buttonLabel, { color: theme.colors.onSurface }]}>
            Emote
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="square"
            size={30}
            style={styles.iconButton}
            iconColor={theme.colors.primary}
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
    justifyContent: 'space-between',
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
