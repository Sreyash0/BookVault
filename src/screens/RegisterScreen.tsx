import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
      Alert.alert('Success', 'Account created!');
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Create Account</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} autoCapitalize="none" />
      <TextInput label="Password (min 6 chars)" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>Register</Button>
      <Button onPress={() => navigation.goBack()}>Already have an account? Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { textAlign: 'center', marginBottom: 24, fontWeight: 'bold' },
  input: { marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 12 },
});
