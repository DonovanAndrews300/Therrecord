import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Card, Title, List, IconButton, useTheme } from 'react-native-paper';

const sessions = [
  { id: '1', name: 'Session 1', date: '2022-09-01' },
  { id: '2', name: 'Session 2', date: '2022-09-02' },
  { id: '3', name: 'Session 3', date: '2022-09-03' },
];

export const RecentSessions = ({ navigation }) => {
  const theme = useTheme(); // Access the theme from context

  const handleViewAll = () => {
    console.log('Navigating to All Sessions'); // Replace with navigation logic
    navigation.navigate('SessionList'); // Ensure you have a route named 'AllSessions'
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.name} - ${item.date}`}
      titleStyle={{ color: theme.colors.onSurface }}
      right={props => (
        <IconButton
          {...props}
          icon="play-circle-outline"
          onPress={() => navigation.navigate("SessionDetails")}
        />
      )}
    />
  );

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={[styles.title, { color: theme.colors.onSurface }]}><Text>Recent Sessions</Text></Title>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
                            View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sessions}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,  // Add space between header and list
  },
  title: {
    flex: 1,
  },
  viewAllText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RecentSessions;
