import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { searchBooks } from '../services/bookApi';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const data = await searchBooks(query);
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search books by title..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.search}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={({ item }) => {
          const authorName = item.author_name?.[0] || 'Unknown Author';
          return (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('BookDetails', { title: item.title, author: authorName, coverId: item.cover_i })}
            >
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
  search: { marginBottom: 12 },
  card: { marginBottom: 8 },
});
