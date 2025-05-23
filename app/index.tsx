import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button } from 'react-native';
// import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { signUp, signIn, signOut } from '../services/user-service'
import { User } from '../services/user-interface'

export default function LoginScreen() {
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

  const handleLogin = async () => {
    const router = useRouter();
    router.navigate('/(tabs)', { withAnchor: true });
    // router.replace('/(tabs)', { withAnchor: true });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.title}       // style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.title}       // style={{ borderBottomWidth: 1, marginBottom: 20 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.separator}>
        <Button title="Sign Up" onPress={() => handleSignUp(email, password)} />
        <Button title="Sign In" onPress={() => handleSignIn(email, password)} />
        <Button title="Sign Out" onPress={handleSignOut} />
        <Button title="Login" onPress={handleLogin} />
      </View >
      {user && <Text>Welcome, {user.email}</Text>}
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#000000',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f10e0ef',
    borderBottomWidth: 1, marginBottom: 10
  },
  separator: {
    marginVertical: 30,
    // height: 1,
    width: '80%',
    height: 200,
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  },
});
