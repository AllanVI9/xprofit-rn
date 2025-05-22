import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { signUp, signIn, signOut } from '../../services/user-service'
import { User } from '../../services/user-interface'

export default function TabOneScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const handleSignUp = async (email: string, password: string) => {
    const usr = await signUp(email, password);
    if (!usr) {
      setUser(null);
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    const usr = await signIn(email, password);
    if (!usr) {
      setUser(null);
    }
  }

  const handleSignOut = async () => {
    const result = await signOut();
    if (result == false) {
      setUser(null);
    }
  }

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Tab One</Text>
  //     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //     <EditScreenInfo path="app/(tabs)/index.tsx" />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Sign Up" onPress={() => handleSignUp(email, password)} />
      <Button title="Sign In" onPress={() => handleSignIn(email, password)} />
      <Button title="Sign Out" onPress={handleSignOut} />
      {user && <Text>Welcome, {user.email}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
