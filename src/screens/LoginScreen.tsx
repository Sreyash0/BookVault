import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      await signInWithEmailAndPassword(getAuth(), email.trim(), password);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>BookVault Login</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} autoCapitalize="none" />
      <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>
      <Button onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { textAlign: 'center', marginBottom: 24, fontWeight: 'bold' },
  input: { marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 12 },
});
