
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({ fetchNewWord }) {

  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={fetchNewWord}>
      <Text style={styles.buttonText}>new word</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 70,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Athletics',
    color: '#BEF49C'
  }
});