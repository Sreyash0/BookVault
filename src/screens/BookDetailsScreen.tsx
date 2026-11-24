import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { addBookToLibrary } from '../services/libraryService';

export default function BookDetailsScreen({ route }: any) {
  const { title, author, coverId } = route.params;

  const handleSave = async () => {
    await addBookToLibrary({ title, author, coverId: coverId || 0 });
    Alert.alert('Saved!', `"${title}" has been added to your Firestore library.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        {coverId ? (
          <Card.Cover source={{ uri: `https://openlibrary.org{coverId}-L.jpg` }} style={styles.cover} />
        ) : null}
        <Card.Content style={styles.content}>
          <Text variant="headlineSmall">{title}</Text>
          <Text variant="titleMedium" style={styles.author}>By {author}</Text>
          <Button mode="contained" icon="bookmark-plus" onPress={handleSave} style={styles.btn}>
            Add to My Library
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  cover: { height: 360 },
  content: { marginTop: 12 },
  author: { color: 'gray', marginVertical: 8 },
  btn: { marginTop: 12 },
});
