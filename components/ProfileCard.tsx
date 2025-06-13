import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { Card } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '@/components/Themed';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;

type InvestorProfileCardProps = {
  title: string;
  description: string;
  color: string;
  imageSource: ReturnType<typeof require | any>;
  style?: object;
};

export default function InvestorProfileCard({
  title,
  description,
  imageSource,
  style,
}: InvestorProfileCardProps) {
  const titleStyle =
    title.toLowerCase() === 'conservador'
      ? styles.conservador
      : title.toLowerCase() === 'moderado'
        ? styles.moderado
        : styles.agressivo;

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.svgContainer}>
        <Image
          source={imageSource}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <Card.Content>
        <Text style={[titleStyle, styles.cardtitle]}>{title}</Text>
        <Text style={styles.content}>{description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
    maxWidth: screenWidth - 32,
  },
  cardtitle: {
    fontSize: 22,
    marginBottom: 12,
    padding: 8,
  },
  conservador: {
    color: Colors.green,
  },
  moderado: {
    color: Colors.yellow,
  },
  agressivo: {
    color: Colors.red,
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
    zIndex: 1,
  },
});
