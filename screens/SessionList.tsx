import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { List, IconButton, useTheme } from 'react-native-paper';

// Sample data for the sessions
const sessions = [
  { id: '1', name: 'Session 1', date: '2022-09-01' },
  { id: '2', name: 'Session 2', date: '2022-09-02' },
  { id: '3', name: 'Session 3', date: '2022-09-03' },
  // Add more sessions as needed
];

export const SessionList = ({ navigation }) => {
  const theme = useTheme();  // Access the theme from context

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.name} - ${item.date}`}
      titleStyle={{ color: theme.colors.onSurface }} // Apply text color from theme
      right={props => (
        <IconButton
          {...props}
          icon="play-circle-outline"
          onPress={() => navigation.navigate("SessionDetails")}
          iconColor={theme.colors.primary}
        />
      )}
      style={[styles.listItem, { borderBottomColor: theme.colors.outline }]} // Apply themed border color
    />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.sessionListContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Sessions</Text>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={[styles.listContainer, { backgroundColor: theme.colors.background }]} // Apply background color from theme
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sessionListContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,  // Rounded corners for the container
    borderWidth: 1,  // Optional border
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});

export default SessionList;
