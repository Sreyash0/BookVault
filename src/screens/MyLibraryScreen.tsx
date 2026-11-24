import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { getMyLibrary, updateBookStatus, deleteBookFromLibrary } from '../services/libraryService';

export default function MyLibraryScreen({ navigation }: any) {
  const [books, setBooks] = useState<any[]>([]);

  const loadLibrary = async () => {
    const data = await getMyLibrary();
    setBooks(data);
  };

  useFocusEffect(useCallback(() => { loadLibrary(); }, []));

  const handleLogout = async () => {
    await signOut(getAuth());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="bodyMedium">{getAuth().currentUser?.email}</Text>
        <Button mode="outlined" onPress={handleLogout}>Logout</Button>
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No books saved yet.</Text>}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} subtitle={`${item.author} • ${item.status}`} />
            <Card.Actions>
              <Button
                onPress={async () => {
                  const next = item.status === 'Want to Read' ? 'Completed' : 'Want to Read';
                  await updateBookStatus(item.id, next);
                  loadLibrary();
                }}
              >
                {item.status === 'Want to Read' ? 'Mark Completed' : 'Re-read'}
              </Button>
              <Button
                textColor="red"
                onPress={async () => {
                  await deleteBookFromLibrary(item.id);
                  loadLibrary();
                }}
              >
                Remove
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  card: { marginBottom: 10 },
});
