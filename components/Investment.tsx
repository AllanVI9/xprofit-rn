import Colors from '@/constants/Colors';
import { InvestmentTypes } from '@/services/question-interface';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function InvestmentCard({ description }: any) {

  type StatusColorMap = {
    [key in InvestmentTypes]: string;
  };

  const statusColors: StatusColorMap = {
    [InvestmentTypes.Alternatives]: 'green',
    [InvestmentTypes.DynamicFixedIncome]: 'red',
    [InvestmentTypes.PostFixedIncome]: 'blue',
    [InvestmentTypes.RealEstateFunds]: 'orange',
    [InvestmentTypes.MultimarketFunds]: 'gray',
    [InvestmentTypes.Internacional]: 'pink',
    [InvestmentTypes.MarketShare]: 'yellow'
  };

  const color = statusColors[description as InvestmentTypes];
  return (
    <View style={styles.rowContainer}>
      <Svg height="40" width="40">
        <Circle cx="20" cy="20" r="7" fill={color} />
      </Svg>
      <Text style={{ color: Colors.gray, fontWeight: 'normal', fontSize: 20 }}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.card,
    marginBottom: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card
  },
});
