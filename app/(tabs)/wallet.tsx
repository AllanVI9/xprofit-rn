import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import WalletCard from '@/components/WalletCard';
import useUserContext from '../context/user';
import useQuestionContext from '../context/question';
import { useEffect, useState } from 'react';
import { ProfileTypes, Question, InvestmentTypes } from '@/services/question-interface';
import { FirestoreService } from '@/services/firestore-service';
import { investmentSuggestion } from '@/buisness/question-buisness';
import InvestmentCard from '@/components/Investment';
import { Loader } from '@/components/Loader';
import { Timestamp } from 'firebase/firestore';

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<String | null>(null);
  const [howMuchInvested, setHowMuchInvested] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [investment, setInvestment] = useState<InvestmentTypes[]>([]);
  const [color, setColor] = useState('#ffbe0c'); // cor inicial
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
      console.log('==> RESULT3:', serviceQuestions);
      if (serviceQuestions != null) {
        let prof: ProfileTypes | null = null
        if (serviceQuestions.profile != null) {
          prof = serviceQuestions.profile
        }
        // Seu Perfil
        setProfile(prof)
        // Valor investido
        setHowMuchInvested(serviceQuestions.howMuchInvested != null ? serviceQuestions.howMuchInvested.toFixed(2) : '0,00')
        // Data de atualização
        let customFormattedDate = '---';
        if (serviceQuestions.updatedAt) {
          let dateObj: Date;
          if (serviceQuestions.updatedAt instanceof Timestamp) {
            dateObj = serviceQuestions.updatedAt.toDate();
          } else {
            dateObj = new Date(serviceQuestions.updatedAt as string | number | Date);
          }
          if (!isNaN(dateObj.getTime())) {
            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObj.getFullYear();
            customFormattedDate = `${day}/${month}/${year}`;
          }
        }
        setUpdatedAt(customFormattedDate);
        // Seu investimento
        if (prof != null) {
          const invest = investmentSuggestion(prof);
          setInvestment(invest);
        }
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

  const windowWidth = Dimensions.get('window').width;
  const screenWidth = Dimensions.get('screen').width;

  return (
    <View style={styles.container} >
      {isLoading && <Loader />}
      <WalletCard style={styles.info}>
        <Text style={{ color: Colors.yellow, fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>Carteira:</Text>
        <Text style={{ color: color, fontWeight: 'bold', fontSize: 30, paddingBottom: 20 }}>{profile != null ? profile : '---'}</Text>
        <Text style={{ color: Colors.gray, fontWeight: 'bold', fontSize: 20 }}>Valor investido:</Text>
        <Text style={{ color: Colors.yellow, fontSize: 30 }}>R$ {howMuchInvested.replace('.', ',')}</Text>
        <Text style={{ color: Colors.yellow, fontWeight: 'normal', fontSize: 14, paddingTop: 20, width: windowWidth - 70, textAlign: 'right' }}>Atualizada em: {updatedAt}</Text>
      </WalletCard>
      <WalletCard style={styles.investment}>
        <Text style={{ color: Colors.yellow, fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>Investimentos:</Text>
        {investment.map((item) => (
          <View key={item}>
            <InvestmentCard description={item} />
          </View>
        ))}
      </WalletCard>
    </View >
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#000000',
    padding: 20
  },
  info: {
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  investment: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});
