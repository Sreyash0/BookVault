import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const getTrendingBooks = async () => {
  const response = await axios.get(`${BASE_URL}/subjects/fiction.json?limit=15`);
  return response.data.works;
};

export const searchBooks = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=15`);
  return response.data.docs;
};
