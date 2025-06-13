import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '@/components/Themed';
import { signUp } from '../../services/user-service';
import Colors from '@/constants/Colors';
import { useUserContext } from '../context/user';
import { Loader } from '@/components/Loader';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSignUp = async (email: string, password: string) => {
    if (email.trim() == '' || password.trim() == '') {
      alert("Por favor digite todos os campos!");
      handleFocus();
      return;
    }
    setIsLoading(true);
    const router = useRouter();
    const usr = await signUp(email, password);
    if (!usr) {
      setUser(null);
    } else {
      setUser(usr);
      router.replace('/questions');
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
            placeholder="Cadastre seu email:"
            placeholderTextColor='#C0C0C0'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput style={styles.title}
            placeholder="Cadastre sua senha:"
            placeholderTextColor='#C0C0C0'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.link} onPress={() => router.back()}>
            <Text style={styles.signupButtonText}>Já tem conta? Entrar</Text>
          </Pressable>
          <View style={styles.separator}>
            {/* <Pressable style={styles.link} onPress={() => handleSignUp(email, password)}>
              <Text style={styles.signupButtonText}>Cadastrar</Text>
            </Pressable> */}
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => handleSignUp(email, password)}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
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
    padding: 20,
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
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  botao: {
    minWidth: 200,
    width: '80%',
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: Colors.gray,
  },
  signupButtonText: {
    textAlign: 'right',
    color: Colors.yellow,
    fontSize: 17,
    fontWeight: 'bold',
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
