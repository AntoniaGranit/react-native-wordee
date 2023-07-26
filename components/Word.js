import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';


export default function Word({ word, definition, loading }) {

  return (
    <View style={styles.container}>
        { loading ? 
        <View style={styles.aiContainer}>
        <ActivityIndicator size='large' color='#BEF49C' />
        </View> :
        <View style={styles.textContainer}>
          <Text style={styles.h1}>{word}</Text>
          <Text style={styles.paragraph}>
     {definition}
      </Text>
      </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  aiContainer: {
    marginTop: 200,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    width: '100%'
  },
  h1: {
    fontSize: 50,
    lineHeight: 60,
    marginBottom: 15,
    fontWeight: 'bold',
    fontFamily: 'Athletics',
    color: '#BEF49C'
  },
  paragraph: {
    fontSize: 25,
    lineHeight: 30,
    fontFamily: 'Athletics',
    color: '#BEF49C'
  }
});
