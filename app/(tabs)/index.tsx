import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button, Dimensions } from 'react-native';
// import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { signUp, signIn, signOut } from '../../services/user-service'
import { User } from '../../services/user-interface'
import { Card, Text } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import Colors from '../../constants/Colors';

export default function TabOneScreen() {
  const [color, setColor] = useState('#ffbe0c'); // cor inicial

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) => (prev === '#ffbe0c' ? '#ff0000' : '#ffbe0c'));
    }, 500); // troca a cada 500ms

    return () => clearInterval(interval); // limpa o intervalo quando desmontar
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipos de Perfil Investidor</Text>
      <Card style={styles.card}>
        <View style={styles.svgContainer}>
          <Svg height="24" width="24">
            <Circle cx="12" cy="12" r="10" strokeWidth="2.5" fill={color} />
          </Svg>
        </View>
        <Card.Content>
          <Text style={styles.conservador} variant="titleLarge">Conservador</Text>
          <Text style={styles.content} variant="bodyMedium">Se você prefere investir em produtos de baixo risco e ganhar menos, mas ganhar sempre, isso indica que você tem um perfil conservador. </Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <View style={styles.svgContainer}>
          <Svg height="24" width="24">
            <Circle cx="12" cy="12" r="10" strokeWidth="2.5" fill={color} />
          </Svg>
        </View>
        <Card.Content>
          <Text style={styles.moderado} variant="titleLarge">Moderado</Text>
          <Text style={styles.content} variant="bodyMedium">Não abre mão de segurança na hora de investir , mas está aberto a maiores riscos para obter melhor rentabilidade , isso indica que você tem perfil moderado.</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <View style={styles.svgContainer}>
          <Svg height="24" width="24">
            <Circle cx="12" cy="12" r="10" strokeWidth="2.5" fill={color} />
          </Svg>
        </View>
        <Card.Content>
          <Text style={styles.agressivo} variant="titleLarge">Agressivo</Text>
          <Text style={styles.content} variant="bodyMedium">Deseja assumir riscos mais altos na busca de uma rentabilidade mais expressiva, o seu perfil pode ser agressivo.</Text>
        </Card.Content>
      </Card>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.yellow,
    borderBottomWidth: 1, marginBottom: 10
  },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%'
  // },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 16, // espaço responsivo entre os cards
    width: '100%', // garante que use toda a largura do container
    maxWidth: screenWidth - 32, // deixa margem lateral proporcional à tela
    alignSelf: 'center',
  },
  conservador: {
    color: Colors.green,
    marginBottom: 12,
    padding: 8,

  },
  moderado: {
    color: Colors.yellow,
    marginBottom: 12,
    padding: 8,
  },
  agressivo: {
    color: Colors.red,
    marginBottom: 12,
    padding: 8,
  },
  content: {
    fontSize: 17,
    color: Colors.gray,
  },
  svgContainer: {
    backgroundColor: Colors.card,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1, // garante que fique acima do conteúdo
  },
});
