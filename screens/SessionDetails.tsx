import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button, IconButton, Headline, Card, Divider, useTheme } from 'react-native-paper';

export const SessionDetails = () => {
  const [transcriptVisible, setTranscriptVisible] = useState(false);
  const theme = useTheme(); // Access the theme from context

  const toggleTranscript = () => {
    setTranscriptVisible(!transcriptVisible);
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Headline style={[styles.header, {color: theme.colors.onBackground}]}><Text>Session Details</Text></Headline>
      <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <View style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
              <IconButton
                icon="play-circle"
                size={48}
                onPress={() => console.log('Play Audio')}
              />
              <Text style={[styles.iconText, {color: theme.colors.onSurface}]}>Play Audio</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="file-document"
                size={48}
                onPress={() => console.log('Transcribe')}
              />
              <Text style={[styles.iconText, {color: theme.colors.onSurface}]}>Transcribe</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="delete"
                size={48}
                onPress={() => console.log('Delete Session')}
              />
              <Text style={[styles.iconText, {color: theme.colors.onSurface}]}>Delete</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Divider />
      <Button 
        icon={transcriptVisible ? 'chevron-up' : 'chevron-down'} 
        mode="text" 
        color={theme.colors.primary}
        onPress={toggleTranscript}
        style={styles.toggleButton}
      >
        {transcriptVisible ? 'Hide Transcript' : 'Show Transcript'}
      </Button>
      {transcriptVisible && (
        <Card style={[styles.transcriptCard, {backgroundColor: theme.colors.surface}]}>
          <Card.Content>
            <Text style={{color: theme.colors.onSurface}}>
              This is where the transcript will be shown. It includes detailed text of the audio session and can be toggled to show or hide.
            </Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
  },
  toggleButton: {
    alignSelf: 'center',
  },
  transcriptCard: {
    marginTop: 10,
    padding: 10,
  },
});

