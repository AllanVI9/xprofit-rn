import { StyleSheet, View, Text, Image } from 'react-native';
import { expo } from '../app.json'
import Colors from '@/constants/Colors';

export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: '80%', height: '30%' }}
        resizeMode="contain"
      />
      <Text style={styles.version}>v {expo.version}</Text>
      <Text style={styles.info}>Nosso aplicativo foi desenvolvido para ser um guia inteligente de investimentos, com o propósito de ajudar você a tomar decisões financeiras mais conscientes e alinhadas aos seus objetivos pessoais.

        Por meio de uma análise simples e eficiente, o app coleta informações essenciais sobre seu momento financeiro, preferências e tolerância ao risco. Com base nesses dados, ele identifica o seu perfil de investidor, seja Conservador, Moderado ou Agressivo, a partir disso, sugere os investimentos mais adequados para você.

        Essas sugestões personalizadas são exibidas na área da Carteira, onde você pode acompanhar suas recomendações e construir uma estratégia de investimentos consistente com seu perfil e metas.

        Nosso objetivo é oferecer uma experiência prática, segura e personalizada, promovendo a educação financeira e ajudando você a investir com mais clareza e confiança.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  info: {
    flex: 1,
    textAlign: 'justify',
    color: Colors.yellow,
    fontSize: 16,
    fontWeight: 'medium',
    padding: 30,
    marginTop: 40,
  },
  version: {
    color: Colors.yellow,
    fontSize: 16,
    fontWeight: 'light',
  },
});
