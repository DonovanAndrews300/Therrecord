import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title, List, IconButton } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';


export const RecentSessions = ({ navigation }) => {
  const theme = useTheme(); // Access the theme from context
  const {user} = useAuth();
  const userId = user.uid;
  const { audioSessions, getAudioSessions, hasMore, loading } = useFirestore();
  const recentSessions = audioSessions.slice(0,5);
  console.log(userId);
  useEffect(() => {
    getAudioSessions(userId);
  }, [userId]);

  const handleViewAll = () => {
    navigation.navigate('SessionList'); // Ensure you have a route named 'SessionList'
  };

  const renderItem = ({ item }) => (
    <List.Item
      key={item.id}
      title={`${item.file_name} - ${item.uploaded_at}`}
      titleStyle={{ color: theme.colors.onSurface }}
      right={props => (
        <IconButton
          {...props}
          icon="play-circle-outline"
          onPress={() => navigation.navigate("SessionDetails", { item })}
        />
      )}
    />
  );

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={[styles.title, { color: theme.colors.onSurface }]}><Text> Recent Sessions</Text></Title>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentSessions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {hasMore && (
          <TouchableOpacity onPress={() => getAudioSessions(userId)} disabled={loading} style={styles.loadMoreButton}>
            <Text style={{ color: theme.colors.primary }}>
              {loading ? 'Loading...' : 'Load More'}
            </Text>
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
  },
  viewAllText: {
    fontSize: 16,
  },
});

