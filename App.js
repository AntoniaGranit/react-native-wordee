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
const [definitionLoading, setDefinitionLoading] = useState(false);
const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'ZcZTQSOr+cEQvyB3Vfn/gw==ZWASL4qVRX18Pdei',
    },
  };

  // Function to fetch a new word
  const fetchNewWord = () => {
    setLoading(true);
    setDefinition(null);
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
    setDefinitionLoading(true);
    fetch(`https://api.api-ninjas.com/v1/dictionary?word=${currentWord}`, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.definition && data.definition.trim() !== '') {
          setDefinition(data.definition);
        } else {
          setDefinition("I don't have a definition for this word yet. Can you help me out by googling it?");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setDefinitionLoading(false));
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
        {/* As long as either the word or its definition have not yet rendered, the activity indicator will be shown: */}
        <Word word={word} definition={definition} loading={loading || definitionLoading} />
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20
  },
  textContainer: {
  },
  buttonContainer: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#052E31',
  }
});