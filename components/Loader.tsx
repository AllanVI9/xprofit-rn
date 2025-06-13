import { StyleSheet, ActivityIndicator, View } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffbe0c" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.82,
    zIndex: 99
  },
});
