import React, { useRef, useState } from 'react';
import { router, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { signUp, signIn } from '../../services/user-service'
import Colors from '@/constants/Colors';
import { useUserContext } from '../context/user';
import { Loader } from '@/components/Loader';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUserContext();
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current!.focus();
  };

  const handleSignIn = async (email: string, password: string) => {
    if (email.trim() == '' || password.trim() == '') {
      alert("Por favor digite todos os campos!");
      handleFocus();
      return;
    }
    setIsLoading(true);
    const router = useRouter();
    const usr = await signIn(email, password);
    if (!usr) {
      setUser(null);
    } else {
      setUser(usr);
      console.log('==> USR LOGIN:', usr);
      router.replace('/(tabs)');
    }
    setIsLoading(false);
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: 'center', }}>
        {isLoading && <Loader />}
        <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: '80%', flexDirection: 'row'
            }}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={0}
          style={styles.container}>
          <TextInput ref={inputRef} style={styles.title}
            autoFocus={true}
            placeholder="Digite seu email:"
            placeholderTextColor='#C0C0C0'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput style={styles.title}
            placeholder="Digite sua senha:"
            placeholderTextColor='#C0C0C0'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {/* <Pressable style={styles.link} onPress={() => handleSignUp(email, password)}>
            <Text style={styles.signupButtonText}>Cadastrar</Text>
          </Pressable> */}
          <Pressable style={styles.link} onPress={() => router.push('/register')}>
            <Text style={styles.signupButtonText}>Não tem conta? Cadastrar</Text>
          </Pressable>
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
          </View >
        </KeyboardAvoidingView >
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: Colors.yellow,
    padding: 20
  },
  title: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    margin: 8,
    borderRadius: 8,
  },
  signupButtonText: {
    textAlign: 'right',
    color: Colors.yellow,
    fontSize: 17,
    fontWeight: 'bold',
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
  link: {
    width: '80%',
  },
  separator: {
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
});
