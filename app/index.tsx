import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button, Pressable, Image } from 'react-native';
// import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { signUp, signIn, signOut } from '../services/user-service'
import { User } from '../services/user-interface'
import Colors from '@/constants/Colors';

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
    const router = useRouter();
    const usr = await signIn(email, password);
    if (!usr) {
      setUser(null);
    } else {
      setUser(usr);
      router.replace('/(tabs)');
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
    // router.navigate('/(tabs)', { withAnchor: true });
    router.replace('/(tabs)', { withAnchor: true });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={{ width: '120%', height: '50%', flexDirection: 'row' }}
        resizeMode="contain"
      />
      <TextInput style={styles.title}
        placeholder="Digite seu email:"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.title}
        placeholder="Digite sua senha:"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.separator}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handleSignIn(email, password)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handleSignUp(email, password)}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
        {/* <Button title="Sign Up" onPress={() => handleSignUp(email, password)} />
        <Button title="Sign In" onPress={() => handleSignIn(email, password)} />
        <Button title="Sign Out" onPress={handleSignOut} /> */}
        <Button title="Login" onPress={handleLogin} />
      </View >
      {user && <Text>Welcome, {user.email}</Text>}
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.yellow,
    padding: 20
  },
  title: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    margin: 8,
    borderRadius: 8,
  },
  botao: {
    minWidth: 200,
    width: '80%',
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonPressed: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  separator: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 100,
    // backgroundColor: 'white',
    // marginVertical: 30,
    // color: 'white',
    // width: '80%',
    // height: 200,
    // justifyContent: 'space-between',
    // padding: 30
  },
});
