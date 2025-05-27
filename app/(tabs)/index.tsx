import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { Icon } from 'react-native-elements'
// import EditScreenInfo from '@/components/EditScreenInfo';
import { View, Text } from '@/components/Themed';
import ProfileCard from '@/components/ProfileCard';
// import { signUp, signIn, signOut } from '../../services/user-service'
// import { User } from '../../services/user-interface';
import Colors from '../../constants/Colors';

export default function TabOneScreen() {
  const [color, setColor] = useState('#ffbe0c'); // cor inicial
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) => (prev === '#ffbe0c' ? '#ff0000' : '#ffbe0c'));
    }, 500); // troca a cada 500ms

    return () => clearInterval(interval); // limpa o intervalo quando desmontar
  }, []);
  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Ionicons style={styles.icon} name="person" size={100} color={'white'} />
        <View style={styles.headerperfil}>
          <View style={styles.perfil}>
            <Text style={styles.titleperfil}>Seu Perfil: <Text style={styles.moderado}>Moderado</Text></Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.buttonPressed, // efeito ao pressionar
            ]}
            onPress={() => router.push('/detalhes')}

          >
            <Text style={styles.buttonText}>Detalhes</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.perfil}>
        <Text style={styles.title}>Tipos de Perfil Investidor</Text>

        <ProfileCard
          title="Conservador"
          description="Se você prefere investir em produtos de baixo risco e ganhar menos, mas ganhar sempre, isso indica que você tem um perfil conservador."
          color={color}
          imageSource={require('../../assets/images/pig.png')}
        />

        <ProfileCard
          title="Moderado"
          description="Não abre mão de segurança na hora de investir , mas está aberto a maiores riscos para obter melhor rentabilidade , isso indica que você tem perfil moderado."
          color={color}
          imageSource={require('../../assets/images/balance.png')}
        />

        <ProfileCard
          title="Agressivo"
          description="Deseja assumir riscos mais altos na busca de uma rentabilidade mais expressiva, o seu perfil pode ser agressivo."
          color={color}
          imageSource={require('../../assets/images/chart-up.png')}
        />
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000000',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    paddingBottom: 50,
  },
  headerperfil: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // move tudo para a direita
  },
  botao: {
    minWidth: 200,
    width: '65%',
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonPressed: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.yellow,
    borderBottomWidth: 1,
    paddingBottom: 25
  },
  titleperfil: {
    fontSize: 25,
    color: 'white',
  },
  perfil: {
    alignItems: 'center',
    // justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  icon: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginRight: 6,
  },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%'
  // },
  moderado: {
    color: Colors.yellow,
  },
});
