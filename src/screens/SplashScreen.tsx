import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { getAuth } from '@react-native-firebase/auth';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = getAuth().currentUser;
      navigation.navigate(user ? 'MainTabs' : 'Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/book_logo.png')} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>BookVault</Text>
      <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 110, height: 110, marginBottom: 16, borderRadius: 20 },
  title: { fontWeight: 'bold', color: '#6200ee' },
});
