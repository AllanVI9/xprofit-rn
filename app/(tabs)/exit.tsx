import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { signOut } from '../../services/user-service'
import { useRouter } from 'expo-router';

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
    const router = useRouter();
    router.navigate('/');
  }

  return (
    <View style={styles.container}>
      <Text>TODO...</Text>
      <Button title="Sair" onPress={() => handleExit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
