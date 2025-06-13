import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from '@/components/Themed';
import ProfileCard from '@/components/ProfileCard';
import Colors from '../../constants/Colors';
import useQuestionContext from '../context/question';
import { ProfileTypes, Question } from '@/services/question-interface';
import { FirestoreService } from '@/services/firestore-service';
import useUserContext from '../context/user';
import { Loader } from '@/components/Loader';

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const [color, setColor] = useState('#ffbe0c'); // cor inicial
  const router = useRouter();

  const { user } = useUserContext();
  const { question } = useQuestionContext();

  useEffect(() => {
    const fetchData = async () => {
      if (user == null) {
        console.log('Usuário inexistente!');
        return;
      }
      try {
        await getQuestion(user.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [question]);

  const getQuestion = async (userId: string) => {
    setIsLoading(true);
    let serviceQuestions: Question | null = question;
    try {
      if (serviceQuestions == null) {
        const questionService = new FirestoreService<Question>('questions');
        serviceQuestions = await questionService.read(userId);
      }
      console.log('==> RESULT2:', serviceQuestions);
      if (serviceQuestions != null) {
        // Seu Perfil
        setProfile(serviceQuestions.profile ? serviceQuestions.profile : ProfileTypes.Conservative)
      }
      // Setando cor do perfil
      if (serviceQuestions != null) {
        switch (serviceQuestions.profile) {
          case ProfileTypes.Conservative:
            setColor(Colors.green)
            break;
          case ProfileTypes.Moderate:
            setColor(Colors.yellow)
            break;
          case ProfileTypes.Aggressive:
            setColor(Colors.red)
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log('==> Error:', error);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container} >
      {isLoading && <Loader />}
      <View style={styles.header}>
        <Ionicons style={styles.icon} name="person" size={100} color={'white'} />
        <View style={styles.headerperfil}>
          <View style={styles.perfil}>
            <Text style={styles.titleperfil}>Seu Perfil: <Text style={{ color: color }}>{profile}</Text></Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.buttonPressed
            ]}
            onPress={() => router.push('/details')}
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
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    backgroundColor: 'black',
  },
  icon: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginRight: 6,
  },
});
