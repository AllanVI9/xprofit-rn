import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function DetalhesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Perfil:</Text>
      <Text style={styles.perfil}>Moderado</Text>
      <View style={styles.form}>
        <View style={styles.info}>
          <Text style={styles.question}>Idade:</Text>
          <Text style={[styles.answer, { marginLeft: 8 }]}>34</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.question}>Já investiu?:</Text>
          <Text style={[styles.answer, { marginLeft: 8 }]}>Sim</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.question}>Produtos que investiu?:</Text>
          <Text style={[styles.answer, { marginLeft: 8 }]}>Renda fixa e ações</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.question}>Está disposto a assumir riscos?:</Text>
          <Text style={[styles.answer, { marginLeft: 8 }]}>Sim</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.question}>Quanto pretende investir?:</Text>
          <Text style={[styles.answer, { marginLeft: 8 }]}>R$200.000,00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'black'
  },
  form: {
    marginTop: 30,
  },
  titulo: {
    color: Colors.gray,
    fontSize: 45,
  },
  perfil: {
    color: Colors.yellow,
    fontSize: 30,
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
