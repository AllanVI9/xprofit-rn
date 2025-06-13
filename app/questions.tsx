import Colors from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { Checkbox, RadioButton, Text } from 'react-native-paper';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { FirestoreService } from '../services/firestore-service'
import { Question, ProductTypes, RiskTypes } from '../services/question-interface'
import { useUserContext } from './context/user';
import { Loader } from '@/components/Loader';
import useQuestionContext from './context/question';
import { checkProfile } from '@/buisness/question-buisness';
import { Timestamp } from 'firebase/firestore';

export default function Forms() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsInvested, setProductsInvested] = useState<[ProductTypes?]>();
  const [investedBefore, setInvestedBefore] = useState('');
  const [riskTypes, setRiskTypes] = useState('');
  const [age, setAge] = useState('');
  const [yearsInvesting, setYearsInvesting] = useState('');
  const [howMuchInvested, setHowMuchInvested] = useState('');

  const [existQuestions, setExistQuestions] = useState(false);
  const { user } = useUserContext();
  const { setQuestion } = useQuestionContext();

  const toggleOpcao = (key: ProductTypes) => {
    const actualArray: [ProductTypes?] = [...productsInvested!];
    const index = productsInvested?.findIndex(item => item === key);
    if (index !== -1) {
      actualArray.splice(index!, 1);
    } else {
      actualArray.push(key)
    }
    setProductsInvested(actualArray);
  };

  const getQuestion = async (userId: string) => {
    setIsLoading(true);
    const questionService = new FirestoreService<Question>('questions');
    try {
      let serviceQuestions: Question | null = await questionService.read(userId);
      console.log('==> RESULT:', serviceQuestions);
      if (serviceQuestions != null) {
        setExistQuestions(true);
        // Sua idade
        setAge(serviceQuestions.age ? serviceQuestions.age.toString() : '0');
        // Já investiu antes?
        setInvestedBefore(serviceQuestions.investedBefore ? serviceQuestions.investedBefore.toString() : 'false');
        // Quantos anos já investe?
        setYearsInvesting(serviceQuestions.yearsInvesting ? serviceQuestions.yearsInvesting.toString() : '0');
        // Em quais produtos já investiu?
        if (serviceQuestions.productsInvested != null) {
          let prodList: [ProductTypes?] = [];
          serviceQuestions.productsInvested.forEach(product => {
            prodList.push(product);
          });
          console.log('==> Produtos:', prodList);
          setProductsInvested(prodList);
        }
        // Quanto pretende investir?
        setHowMuchInvested(serviceQuestions.howMuchInvested ? serviceQuestions.howMuchInvested.toFixed(2) : '0,00');
        // Está disposto a assumir que tipo de riscos?
        setRiskTypes(serviceQuestions.risk ? serviceQuestions.risk.toString() : '');
      } else {
        // Em quais produtos já investiu? (Reset)
        setProductsInvested([]);
      }
    } catch (error) {
      console.log('==> Error:', error);
    }
    setIsLoading(false);
  }

  const updateQuestion = async (id: string, question: Question) => {
    setIsLoading(true);
    const questionService = new FirestoreService<Question>('questions');
    try {
      question.profile = checkProfile(question);
      // question.updatedAt = new Date();
      question.updatedAt = Timestamp.fromDate(new Date());
      await questionService.update(id, question);
      setQuestion(question);
      console.log('==> Updated successfully');
      setIsLoading(false);
      router.back();
    } catch (error) {
      setIsLoading(false);
      console.log('==> Error:', error);
    }
  }

  const addQuestion = async (userId: string, question: Question) => {
    setIsLoading(true);
    const questionService = new FirestoreService<Question>('questions');
    try {
      question.profile = checkProfile(question);
      // question.updatedAt = new Date();
      question.updatedAt = Timestamp.fromDate(new Date());
      await questionService.createWithId(userId, question);
      setQuestion(question);
      console.log('==> Added successfully');
    } catch (error) {
      console.log('==> Error:', error);
    }
    setIsLoading(false);
    router.replace('/(tabs)');
  }

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
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.quest}>Questionário do Investidor</Text>
          <View>
            <Text style={styles.title}>Sua idade:</Text>
            <TextInput style={styles.titleinput}
              placeholder="Digite sua Idade:"
              value={age}
              onChangeText={setAge}
            />
            <Text style={styles.title}>Já investiu antes?:</Text>
            <RadioButton.Group onValueChange={setInvestedBefore} value={investedBefore}>
              <RadioButton.Item style={styles.radioItem} color={Colors.yellow} uncheckedColor={Colors.card} labelStyle={styles.label} label="Sim" value="true" />
              <RadioButton.Item style={styles.radioItem} color={Colors.yellow} uncheckedColor={Colors.card} labelStyle={styles.label} label="Não" value="false" />
            </RadioButton.Group>
            <Text style={styles.title}>Quantos anos já investe?:</Text>
            <TextInput style={styles.titleinput}
              placeholder="Investe a quantos anos?"
              value={yearsInvesting}
              onChangeText={setYearsInvesting}
            />
            <Text style={styles.title}>Em quais produtos já investiu?:</Text>

            <View style={styles.item}>
              <Checkbox
                status={productsInvested?.includes(ProductTypes.RendaFixa) ? 'checked' : 'unchecked'}
                onPress={() => toggleOpcao(ProductTypes.RendaFixa)}
                color={Colors.yellow}
                uncheckedColor='white'
              />
              <Text style={styles.labelyellow}>Renda Fixa</Text>
            </View>

            <View style={styles.item}>
              <Checkbox
                status={productsInvested?.includes(ProductTypes.RendaVariavel) ? 'checked' : 'unchecked'}
                onPress={() => toggleOpcao(ProductTypes.RendaVariavel)}
                color={Colors.yellow}
                uncheckedColor='white'
              />
              <Text style={styles.labelyellow}>Renda Variável</Text>
            </View>

            <View style={styles.item}>
              <Checkbox
                status={productsInvested?.includes(ProductTypes.Acoes) ? 'checked' : 'unchecked'}
                onPress={() => toggleOpcao(ProductTypes.Acoes)}
                color={Colors.yellow}
                uncheckedColor='white'
              />
              <Text style={styles.labelyellow}>Ações</Text>
            </View>

            <View style={styles.item}>
              <Checkbox
                status={productsInvested?.includes(ProductTypes.TesouroDireto) ? 'checked' : 'unchecked'}
                onPress={() => toggleOpcao(ProductTypes.TesouroDireto)}
                color={Colors.yellow}
                uncheckedColor='white'
              />
              <Text style={styles.labelyellow}>Tesouro Direto</Text>
            </View>

            <Text style={styles.title}>Quanto pretende investir? (R$):</Text>
            <TextInput style={styles.titleinput}
              placeholder="0,00"
              value={howMuchInvested}
              onChangeText={setHowMuchInvested}
            />
            <Text style={styles.title}>Está disposto a assumir que tipo de riscos?:</Text>
            <RadioButton.Group onValueChange={setRiskTypes} value={riskTypes}>
              <RadioButton.Item style={styles.radioItem} color={Colors.yellow} uncheckedColor={Colors.card} labelStyle={styles.label} label={RiskTypes.Small.toString()} value={RiskTypes.Small.toString()} />
              <RadioButton.Item style={styles.radioItem} color={Colors.yellow} uncheckedColor={Colors.card} labelStyle={styles.label} label={RiskTypes.Moderate.toString()} value={RiskTypes.Moderate.toString()} />
              <RadioButton.Item style={styles.radioItem} color={Colors.yellow} uncheckedColor={Colors.card} labelStyle={styles.label} label={RiskTypes.Big.toString()} value={RiskTypes.Big.toString()} />
            </RadioButton.Group>
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.buttonPressed,
              ]}
              onPress={async () => {
                if (user == null) {
                  router.navigate('/(tabs)');
                  return;
                }
                console.log('==> USER:', user);
                let question: Question = {
                  userId: user.id,
                  age: Number(age),
                  investedBefore: Boolean(eval(investedBefore)),
                  yearsInvesting: Number(yearsInvesting),
                  productsInvested: productsInvested as [ProductTypes],
                  howMuchInvested: Number(howMuchInvested),
                  risk: riskTypes as RiskTypes
                }
                console.log('==> FINAL QUESTION:', question);
                if (existQuestions) {
                  updateQuestion(user.id, question);
                } else {
                  addQuestion(user.id, question);
                }
              }}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'black',
    flexGrow: 1,
    // alignItems: 'center',
  },
  quest: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.yellow,
    marginBottom: 60,
  },
  title: {
    color: Colors.yellow,
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  titleinput: {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.yellow,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
  },
  botao: {
    minWidth: 200,
    width: '100%',
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 36,
  },
  buttonPressed: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  labelyellow: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.yellow,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black'
  },
  item: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
