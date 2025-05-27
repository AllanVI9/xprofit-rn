import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

type WalletCardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function WalletCard({ children, style }: WalletCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <Card.Content>
        {children}
      </Card.Content>
    </Card>
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
});
