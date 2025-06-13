import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { FirestoreService } from '@/services/firestore-service';
import { ProductTypes, ProfileTypes, Question } from '@/services/question-interface';
import useUserContext from './context/user';
import { Loader } from '@/components/Loader';
import useQuestionContext from './context/question';

const router = useRouter();

const irParaOutraTela = () => {
  router.navigate('/questions');
};

export default function DetalhesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const [color, setColor] = useState('#ffbe0c'); // cor inicial
  const [productsInvested, setProductsInvested] = useState<[ProductTypes?]>();
  const [investedBefore, setInvestedBefore] = useState('');
  const [riskTypes, setRiskTypes] = useState('');
  const [age, setAge] = useState('');
  const [howMuchInvested, setHowMuchInvested] = useState('');

  const navigation = useNavigation();

  const { user } = useUserContext();
  const { question } = useQuestionContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={irParaOutraTela}>
          <Image
            source={require('../assets/images/black_edit.png')}
            style={styles.imagem}
            resizeMode="contain"
          />
        </Pressable>
      ),
    });
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
  }, [navigation, question]);

  const getQuestion = async (userId: string) => {
    setIsLoading(true);
    let serviceQuestions: Question | null = question;
    try {
      if (serviceQuestions == null) {
        const questionService = new FirestoreService<Question>('questions');
        serviceQuestions = await questionService.read(userId);
      }
      console.log('==> RESULT1:', serviceQuestions);
      if (serviceQuestions != null) {
        // Seu Perfil
        setProfile(serviceQuestions.profile ? serviceQuestions.profile : ProfileTypes.Conservative)
        // Sua idade
        setAge(serviceQuestions.age ? serviceQuestions.age.toString() : '0');
        // Já investiu antes?
        setInvestedBefore(serviceQuestions.investedBefore ? serviceQuestions.investedBefore.toString() : 'false');
        // Em quais produtos já investiu?
        if (serviceQuestions.productsInvested != null) {
          let prodList: [ProductTypes?] = [];
          serviceQuestions.productsInvested.forEach(product => {
            prodList.push(product);
          });
          console.log('==> Produtos:', prodList);
          setProductsInvested(prodList);
        }
        // Está disposto a assumir que tipo de riscos?
        setRiskTypes(serviceQuestions.risk ? serviceQuestions.risk.toString() : '');
        // Quanto pretende investir?
        setHowMuchInvested(serviceQuestions.howMuchInvested ? serviceQuestions.howMuchInvested.toFixed(2) : '0,00');
      } else {
        // Em quais produtos já investiu? (Reset)
        setProductsInvested([]);
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
    <View style={styles.container}>
      {isLoading && <Loader />}
      <Text style={styles.titulo}>Seu Perfil: <Text style={{ color: color, fontSize: 30 }}>{profile}</Text></Text>
      <View style={styles.form}>
        <View style={styles.info}>
          <Text style={[styles.question, { marginRight: 8 }]}>Idade?</Text>
          <Text style={styles.answer}>{age}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.question, { marginRight: 8 }]}>Já investiu?</Text>
          <Text style={styles.answer}>{investedBefore ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.question, { marginRight: 8 }]}>Produtos que investiu?</Text>
          <Text style={styles.answer}>{productsInvested != null && productsInvested!.length > 0 ? productsInvested!.join(', ') : 'Nenhum'}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.question, { marginRight: 8 }]}>Qual risco pode assumir?</Text>
          <Text style={styles.answer}>{riskTypes}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.question, { marginRight: 8 }]}>Quanto pretende investir?</Text>
          <Text style={styles.answer}>R${howMuchInvested.replace('.', ',')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'black'
  },
  imagem: {
    width: 40,
    height: 40,
  },
  form: {
    marginTop: 5,
    padding: 5,
  },
  titulo: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 20,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 30,
  },
  question: {
    color: 'white',
    fontSize: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.gray,
    fontSize: 25,
  }
});
