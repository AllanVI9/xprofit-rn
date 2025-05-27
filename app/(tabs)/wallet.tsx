import { Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import WalletCard from '@/components/WalletCard';

export default function TabTwoScreen() {
  return (
    <View style={styles.container} >
      <WalletCard style={styles.saldo}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>Saldo disponível</Text>
        <Text style={{ color: 'green', fontSize: 30 }}>R$ 6.000,00</Text>
      </WalletCard>
      <WalletCard>
        <Text style={{ color: Colors.yellow, fontWeight: 'bold', fontSize: 20 }}>Em breve mais sugestões</Text>
      </WalletCard>
      <WalletCard>
        <Text></Text>
      </WalletCard>
      <WalletCard>
        <Text></Text>
      </WalletCard>
      <WalletCard>
        <Text></Text>
      </WalletCard>
      <WalletCard>
        <Text></Text>
      </WalletCard>
    </View >
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
  saldo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
