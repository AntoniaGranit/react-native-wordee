import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { View, ScrollView, StyleSheet } from 'react-native';
import Word from './components/Word';
import Button from './components/Button';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Athletics': require('./assets/Athletics.otf'),
  });
const [word, setWord] = useState(null)
const [definition, setDefinition] = useState(null)
const [loading, setLoading] = useState(true)
const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'ZcZTQSOr+cEQvyB3Vfn/gw==ZWASL4qVRX18Pdei',
    },
  };

  // Function to fetch a new word
  const fetchNewWord = () => {
    setLoading(true);
    fetch('https://api.api-ninjas.com/v1/randomword', options)
      .then((resp) => resp.json())
      .then((data) => {
        setWord(data.word);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Function to fetch the definition for the current word
  const fetchWordDefinition = (currentWord) => {
    fetch(`https://api.api-ninjas.com/v1/dictionary?word=${currentWord}`, options)
      .then((resp) => resp.json())
      .then((data) => setDefinition(data.definition))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

    useEffect(() => {
    fetchNewWord(); // Fetch a new word on initial render
  }, []);

  useEffect(() => {
    if (word) {
      fetchWordDefinition(word); // Fetch the definition when word changes
    }
  }, [word]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <Word word={word} definition={definition} loading={loading} />
    </ScrollView>
    <View style={styles.buttonContainer}>
        <Button fetchNewWord={fetchNewWord} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052E31',
    padding: 20,
  },
  textContainer: {
    padddingRight: 20,
    paddingLeft: 20
  },
  buttonContainer: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#052E31',
  }
});