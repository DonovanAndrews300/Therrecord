import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Button, Appbar, useTheme, Text } from 'react-native-paper';

import { RecentSessions } from '../components/RecentSession'; // Ensure the import path is correct

export const Home = ({navigation}) => {
  const theme = useTheme(); // Access the theme from context

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="Home" titleStyle={{ color: theme.colors.onPrimary }} />
        <Appbar.Action icon="cog" color={theme.colors.onPrimary} onPress={() => console.log('Settings')} />
      </Appbar.Header>

      <View style={styles.sessionStartContainer}>
        <IconButton
          icon="play-circle-outline"
          size={60}
          onPress={() => navigation.navigate("Recorder")}
          style={styles.playButton}
        />
        <Text style={[styles.sessionText, { color: theme.colors.primary }]}>Record New Session</Text>
      </View>

      <RecentSessions navigation={navigation} />

      <Button
        icon="star"
        mode="contained"
        color={theme.colors.primary}
        onPress={() => console.log('Rate the App')}
        style={styles.rateButton}
      >
        <Text> Rate the App</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  sessionStartContainer: {
    alignItems: 'center',  // Center aligns the content
    paddingVertical: 20,
  },
  sessionText: {
    fontSize: 18,  // Larger font size for better readability
    fontWeight: '500',  // Medium font weight to make it stand out
  },
  rateButton: {
    margin: 10,
  }
});

export default Home;
