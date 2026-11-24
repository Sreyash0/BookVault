import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, ActivityIndicator } from 'react-native-paper';
import { getTrendingBooks } from '../services/bookApi';

export default function ExploreScreen({ navigation }: any) {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingBooks().then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={({ item }) => {
          const authorName = item.authors?.[0]?.name || 'Unknown Author';
          return (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('BookDetails', { title: item.title, author: authorName, coverId: item.cover_id })}
            >
              {item.cover_id && <Card.Cover source={{ uri: `https://openlibrary.org{item.cover_id}-M.jpg` }} />}
              <Card.Title title={item.title} subtitle={authorName} />
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 12 },
});
