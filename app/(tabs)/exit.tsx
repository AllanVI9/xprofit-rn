import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';
import { signOut } from '../../services/user-service'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function Tab() {

  // const [shouldExit, setShouldExit] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Incluir o texto se deseja sair e se sim chamar a funcão do
    //  service de usuario para sair do firebase e depois sair do app!
  }, []);

  const handleExit = async () => {
    // const usr = await signOut();
    // if (!usr) {
    //   // exit app
    // }
    // const router = useRouter();
    // router.navigate('/');
    const router = useRouter();
    // router.navigate('/(tabs)', { withAnchor: true });
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Deseja sair da conta?</Text>
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.buttonPressed, // efeito ao pressionar
        ]}
        onPress={() => handleExit()}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  texto: {
    color: Colors.yellow,
    fontSize: 30,
  },
  botao: {
    minWidth: 200,
    width: '65%',
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonPressed: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
});
